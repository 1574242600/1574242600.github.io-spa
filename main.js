const fs = require('fs');
const yaml = require('js-yaml');
const parseMD = require('parse-md').default
const marked = require("marked");
const path = require("path");
const hljs = require('highlight.js');
const CONFIG = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
const OUT_PATH = 'public';


//todo: 行号
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

function getPubilc(path = '/') {
    return `./${OUT_PATH}` + path;
}

class FileClass {
    constructor () {
        this.mkdir(getPubilc())
    }

    write(path, data, options = {}) {
        try {
            let writeStream = fs.createWriteStream(path, options);
            writeStream.write(data, 'utf-8');
            return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }

    readdir(path) {
        return fs.readdirSync(path);
    }

    mkdir(path, options = {}) {
        try {
            fs.accessSync(path, fs.constants.W_OK);
        } catch (err) {
            fs.mkdirSync(path, options);
        }
    }

    copy(src, dist) {
        try {
            let src_stat = fs.statSync(src);
            if (!src_stat.isDirectory()) {
                fs.createReadStream(src).pipe(fs.createWriteStream(dist));
                return true;
            }

            this.mkdir(dist);
            this.readdir(src).map(name => {
                let _src = src + '/' + name;
                let _dist = dist + '/' + name;
                this.copy(_src, _dist);
            })

            return true;
        } catch (e) {
            console.log(e)
            return false;
        }

    }
}

const File = new FileClass();

class Source {
    file_list = [];
    constructor () {
        this.file_list = File.readdir('./source');
        this._copy();
    }

    _copy() {
        let copy_list = this.file_list.map(name => {
            if (name[0] !== '_') return [`./source/${name}`, getPubilc(`/${name}`)];
        })

        for (let path_list of copy_list) {
            if (path_list)
                File.copy(path_list[0], path_list[1])
        }
    }
}

class Md {
    md_content_src;
    path;
    info = {
        title: undefined,
        date: undefined,
        tag: undefined   //?
    };

    constructor (post_path) {
        this.path = post_path;
        const { metadata, content } = parseMD(fs.readFileSync(this.path, 'utf8'));
        metadata.date = Date.parse(metadata.date) / 1000 - CONFIG.utc * 3600;
        if (metadata.update) metadata.update = Date.parse(metadata.update) / 1000 - CONFIG.utc * 3600;
        this.info = metadata;
        this.md_content_src = content;
    }

    toJson(more = false) {
        return JSON.stringify(this.get(more))
    }

    get(more = false) {
        let results = {
            info: this.info,
            path: this.path,
            content: this._parseContent(more)
        }

        if (!more) results.nav = this._getNav();
        return results;
    }

    getFileName() {
        return path.basename(this.path);
    }

    _parseContent(more) {
        let src = this.md_content_src;

        if (more) {
            src = src.split('<!--more-->')[0];
        }

        return marked(src);
    }

    _getNav() {
        let count = {};  //处理相同标题
        let results = this.md_content_src.match(/(#+)\s+([\s\S]*?)[\r|\r\n]/g);
        if (results === null) return null;

        return results.map(result => {
            let match = result.match(/(#+)\s+([\s\S]*?)[\r|\r\n]/);
            match[2] = match[2].trim();
            if (count[match[2]] === undefined) {
                count[match[2]] = 1
            } else {
                count[match[2]]++;
            };

            return [match[1].length, count[match[2]] > 1 ? `${match[2]}-${count[match[2]] - 1}` : match[2]];
        })
    }
}

class Posts {
    posts_path = './source/_posts';
    post_list = [];
    per_page = CONFIG.index_generator.per_page;
    total;
    constructor () {
        this.post_list = File.readdir(this.posts_path);
        this.total = this.post_list.length;
    }

    parseAllpost() {
        let Md_list = [];
        let _Md_list = this.post_list.map(post_name => {
            return new Md(this.posts_path + '/' + post_name);
        })

        _Md_list = this.sortPosts(_Md_list);

        for (let t = 0; t < this.total; t += this.per_page) {
            Md_list.push([])
            for (let i = 0; i !== this.per_page; i++) {
                if (_Md_list[i + t])
                    Md_list[t / this.per_page][i] = _Md_list[i + t];
            }
        }

        return Md_list;
    }

    sortPosts(Md_list) {
        return Md_list.sort(function (a, b) {
            return b.info.date - a.info.date;
        });
    }
}

class Pages {
    pages_path = './source/_pages';
    page_list = [];

    constructor () {
        this.page_list = File.readdir(this.pages_path);
    }

    parseAllPages() {
        let Md_list = [];

        this.page_list.map(page_name => {
            Md_list.push(new Md(this.pages_path + '/' + page_name));
        })

        return Md_list
    }
}

class Main {
    Sou;
    Pos;
    Pag;

    start() {
        this.Sou = new Source();
        this.Pos = new Posts();
        this.Pag = new Pages();
        this._writePosts(this.Pos.parseAllpost());
        this._writeArchive(this.Pos.parseAllpost());
        this._writeIndex();
        this._writeLink();

        this._handleConfig();
        this._writeConfig();

        this._writePages();
    }

    _handleConfig() {
        delete CONFIG.link;

        let filterContactNull = (() => {
            let isAllNull = true;

            for (let type in CONFIG.contact) {
                if (CONFIG.contact[type] !== null) {
                    isAllNull = false
                    continue;
                };

                delete CONFIG.contact[type];
            }

            if (isAllNull) CONFIG.contact = null;
        })()

    }

    _writeConfig() {
        File.write(getPubilc('/config.json'), JSON.stringify(CONFIG))
    }

    _writePosts(Md_list) {
        File.mkdir(getPubilc('/post/'));

        for (let t in Md_list) {
            let more_list = [];

            File.mkdir(getPubilc(`/post/${t}/`));
            for (let i in Md_list[t]) {
                let Md = Md_list[t][i];
                let id = this.Pos.total - (Number(t * CONFIG.index_generator.per_page) + Number(i));

                let path = getPubilc(`/post/${t}/`) + `${id}.json`
                File.write(path, Md.toJson())

                more_list.push({ id: id, data: (Md.get(true)) })
            }

            File.write(getPubilc(`/post/${t}/index.json`), JSON.stringify({
                list: more_list
            }))
        }

    }

    _writeIndex() {
        File.write(getPubilc('/post/index.json'), JSON.stringify({
            total: this.Pos.total,
            per_page: CONFIG.index_generator.per_page,
            pages: Math.ceil(this.Pos.total / CONFIG.index_generator.per_page)
        }))

    }

    _writePages() {
        let Md_list = this.Pag.parseAllPages()
        Md_list.map(Md => {
            let path = getPubilc() + Md.getFileName().split('.')[0] + '.json';
            File.write(path, Md.toJson());
        })
    }

    _writeArchive(Md_list) {
        let archive = [];
        for (let t in Md_list) {
            for (let i in Md_list[t]) {
                let Md = Md_list[t][i];
                let id = this.Pos.total - (Number(t * CONFIG.index_generator.per_page) + Number(i));
                archive.push({
                    id: id,
                    title: Md.info.title,
                    date: Md.info.date
                })
            }
        }

        File.write(getPubilc('/archive.json'), JSON.stringify(archive))
    }

    _writeLink() {
        const linkList = CONFIG.link.map(v => {
            const data = v.split('|');
            return {
                name: data[0],
                intr: data[1],
                url: data[2],
                avatar: data[3]
            }
        })

        File.write(getPubilc('/link.json'), JSON.stringify(linkList))
    }
}

(async () => {

    (new Main).start();

})().catch(e => {
    console.log(e)
})
