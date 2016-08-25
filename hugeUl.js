// option示例
// var option = {
//     data: [],
//     targetId: '',
//     itemHeight: 0,
//     tplString: '',
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
            var fragment = document.createDocumentFragment();
            console.log(len)
            // 生成要插入的字符串
            var str = this.setting.tplString;
            var tpl = str.trim();
            for (var i = 0; i < len; i++) {
                str += tpl;
            }
            
            // 设置ul
            var ul = document.createElement('ul');
            ul.innerHTML = str;
            fragment.appendChild(ul);

            //插入到fragment中,进而插入到容器中
            container.appendChild(fragment);
        }

    }
    return hugeUl
}

