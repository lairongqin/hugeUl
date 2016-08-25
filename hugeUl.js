// option示例
// var option = {
//     data: [],
//     targetId: '',
//     itemHeight: 0,
//     tplString: '',
// }
// var option = {
//     data: arr,
//     targetId: 'container',
//     itemHeight: 40,
//     tplString: '<li><span><input type="checkbox" class="checked"></span><span class="name"></span><span class="tel"></span><span class="mail"></span></li>'
// }

function hugeUlList() {
    var hugeUl = {
        setting: {},
        init: function (option) {
            this.setting = option;
            this.insertDOM();
        },
        insertDOM: function () {

            // 获得容器
            var container = document.getElementById(this.setting.targetId);

            // 获得容器高度
            var height = container.clientHeight;

            // 获得所需要插入DOM的个数
            var len = Math.floor(height / this.setting.itemHeight) + 2;

            // 判断数据是否直接用原生
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
            fragment.appendChild(ul);

            //插入到fragment中,进而插入到容器中
            container.appendChild(fragment);
        },
        nativeList: function (container) {

            // 原生插入列表项

            var data = this.setting.data;
            var len = data.length;
            var fragment = document.createDocumentFragment();

            // 把tpl转换成DOM
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.setting.tplString;
            var li = tempDiv.firstChild;

            data.forEach(function (value) {
                var twins = li.cloneNode(true);
                for (var prop in value) {
                    if (Object.prototype.hasOwnProperty.call(value, prop)) {

                        // 找到相对应具有class名称的DOM
                        var span = twins.querySelector('.' + prop);
                        if (span) {
                            if (span.tagName.toLowerCase() != 'input') {
                                span.innerText = value[prop];
                            }
                        }

                    }
                }

                fragment.appendChild(twins);
                twins = null;
            })

            container.appendChild(fragment);

        }

    }
    return hugeUl
}

