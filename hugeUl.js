// option示例
// var option = {
//     data: [],
//     targetId: '',
//     itemHeight: 0,
//     tplString: '',
//     inputClassName: '',
// }
// var option = {
//     data: arr,
//     targetId: 'container',
//     itemHeight: 40,
//     tplString: '<li><span><input type="checkbox" class="checked"></span><span class="name"></span><span class="tel"></span><span class="mail"></span></li>'
//     inputClassName: 'checked';
// }
// inputClassName 用来控制input元素，data中与之名字相同的属性负责对input进行控制
var setting = {
    data: [],
    targetId: '',
    itemHeight: 0,
    tplString: '',
    inputClassName: '',
    keys: [],
    elArr: [],
}

function hugeUlList() {
    var hugeUl = {
        setting: {
            data: [],
            targetId: '',
            itemHeight: 0,
            tplString: '',
            inputClassName: '',
            keys: [],
            elArr: [],
        },
        pointer: -1,
        init: function (option) {

            // 浅层拷贝
            for (var prop in option) {
                if (Object.prototype.hasOwnProperty.call(option, prop)) {
                    this.setting[prop] = option[prop];
                }
            }

            // 抽取所有元素需要写入的属性
            if (this.setting.data[0]) {
                var dataObj = this.setting.data[0];
                for (var prop in dataObj) {
                    if (Object.prototype.hasOwnProperty.call(dataObj, prop)) {
                        if (prop != this.setting.inputClassName) {
                            this.setting.keys.push(prop);
                        }
                    }
                }
                this.insertDOM();
            }
        },
        insertDOM: function () {

            // 获得容器
            var container = document.getElementById(this.setting.targetId);

            // 获得容器高度
            var height = container.clientHeight;

            // 获得所需要插入DOM的个数
            var len = Math.floor(height / this.setting.itemHeight) + 2;

            // 判断是否直接使用原生列表
            if (len > this.setting.data.length) {
                this.nativeList(container);
                return;
            }

            var fragment = document.createDocumentFragment();

            // 生成要插入的字符串
            var str = this.setting.tplString;
            var tpl = str.trim();
            str = '';
            for (var i = 0; i < len; i++) {
                str += tpl;
            }

            // 设置ul
            var ul = document.createElement('ul');
            ul.innerHTML = str;

            // 设置ul高度
            ul.style.height = this.setting.itemHeight * this.setting.data.length + 'px';
            ul.style.position = 'relative';
            fragment.appendChild(ul);

            //插入到fragment中,进而插入到容器中
            container.appendChild(fragment);

            this.referEl(container);
        },
        nativeList: function (container) {
            // 原生插入列表项

            var data = this.setting.data;
            var len = data.length;
            var fragment = document.createDocumentFragment();
            var inputName = this.setting.inputClassName;
            var keys = this.setting.keys;

            // 把tpl转换成DOM
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.setting.tplString;
            var li = tempDiv.firstChild;

            data.forEach(function (value) {
                var twins = li.cloneNode(true);

                keys.forEach(function (prop) {

                    // 找到相对应具有class名称的DOM
                    var span = twins.querySelector('.' + prop);
                    if (span) {
                        span.innerText = value[prop];
                    }
                })

                fragment.appendChild(twins);
                twins = null;
            })

            container.appendChild(fragment);

        },
        referEl: function (container) {
            // 滚动事件
            var that = this;

            // 获取所有DOM的引用，顺便初始化数据
            var ul = container.querySelector('ul');
            var ulArr = ul.childNodes;

            ulArr = Array.prototype.slice.call(ulArr);

            ulArr.forEach(function (node) {
                var temp = {};
                that.pointer++;
                node.style.cssText = 'position:absolute;top:'+ that.pointer *that.setting.itemHeight + 'px';
                that.setting.keys.forEach(function (prop) {
                    temp[prop] = node.querySelector('.' + prop);
                    temp[prop].innerText = that.setting.data[that.pointer][prop];
                });
                temp._el = node;
                temp[that.setting.inputClassName] = node.querySelector('.' + that.setting.inputClassName);
                that.setting.elArr.push(temp);
            })
            console.log(this.setting.elArr)
            this.nowScroll();
        },
        nowScroll: function () {
            var container = document.getElementById(this.setting.targetId);
            var that = this;
            var direction = 0
            container.onscroll = function () {
                that.doScroll(this, direction);
            };
        },
        doScroll: function (scroll, direction) {
            var top = scroll.scrollTop;
            var shift = this.setting.elArr.length - 1;
            var queue = this.setting.elArr;

            if (top - direction > 0) {

                var index = this.pointer - shift;
                while (top > (index * this.setting.itemHeight + 10) && this.pointer + 1 < this.setting.data.length) {

                    var elObj = queue.shift();
                    this.pointer++;

                    this.moveChild(elObj, this.pointer, 0);

                    queue.push(elObj);
                    index = this.pointer - shift;
                }
            }
        },
        moveChild(elObj, index, shift) {
            var el = elObj._el;
            var that = this;
            this.setting.keys.forEach(function(value){
                elObj[value].innerText = that.setting.data[index - shift][value];
            })
            el.style.top = (index - shift)*this.setting.itemHeight + 'px';
        }

    }
    return hugeUl
}

