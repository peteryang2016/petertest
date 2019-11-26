/*
* @手写render、createElement
*
* */
//createElement
/*
createElement:创建JSX对象
参数：至少两个  type、props，children这个部分可能没有，可能有多个
*/

function createElement(type,props,...childrens){
    /*
        //创建一个对象，设置一些默认属性值
        let obj = {
            type:null,
            props:{
                //...childrens是接收剩余的参数，返回数组，如果就一项直接取第0个，否则直接赋值。
                children:childrens.length<=1?(childrens[0]||'') : childrens,
            },
            ref:null,
            key:null
        }
        //用传递的type和props覆盖默认值
        //obj = {...obj,type,props}
        obj = {...obj,type,props:{...props,children}}
        //把ref和key提取出来(并且删除props的key和ref)
        'key' in obj.props?(obj.key=obj.props.key,obj.props.key=undefined):null
        'ref' in obj.props?(obj.ref=obj.props.ref,obj.props.ref=undefined):null
        return obj
    ]*/
    let ref,key;
    if('ref' in props){
        ref=props[ref];
        props[ref]=undefined;
    }
    if('key' in props){
        key=props[key];
        props[key] = undefined;
    }
    return {
        type,
        props:{
            ...props,
            //...childrens是接收剩余的参数，返回数组，如果就一项直接取第0个，否则直接赋值。
            children:childrens.length<=1?(childrens[0]||''):childrens
        },
        ref,
        key
    }
}

//render
function render(obj,container,callBack){
    let {type,props} = obj||{};
    let newElement = document.createElement(type);

    for(let attr in props){
        if(!props.hasOwnProperty(attr)) break;//不是私有的直接结束遍历
        if(!props[attr]) continue;//continue是跳出当前循环，如果当前属性没有值（undefined）直接不处理即可，
        //即有值也是私有的
        let value = props[attr];//id,className,style:styleObj,children
        //class-name处理
        if(attr==='className'){
            newElement.setAttribute('class',value)
            continue;
        }
        //style处理
        if(attr==='style'){
            if(value==='') continue;
            for(let stykey in value){
                if(value.hasOwnProperty(stykey)){
                    newElement['style'][stykey] = value[stykey]
                }
            }
            continue
        }

        //children

        if(attr==='children'){
            /*
                可能是一个值：可能是字符串也可能是一个jsx对象
                可能是一个数组：数组中的每一项可能是字符串也可能是对象


            */

            //首先把一个值也变为数组，这样后期统一操作数组即可
            if(!(value instanceof Array)){
                value = [value]
            }
            value.forEach((item,index) => {
                //验证item是什么类型的：如果是字符串就是创建文本节点，如果是对象我们再次执行render方法，把创建的元素放到最开始创建的大盒子中
                if(typeof item==='string'){
                    let text = document.createTextNode(item)
                    newElement.appendChild(text)
                }else{//对象

                    render(item,newElement)
                }
            });
            /*
            else{
                //如果只有一个值，我们创建一个文本节点即可
                let text = document.createTextNode(value)
                newElement.appendChild(text)
            }
            */
        }
        newElement.setAttribute(attr,value)//基于set-attribute可以让设置的属性表现在html的结构上
    }
    container.appendChild(newElement);
    callBack&&callBack();
}
export {createElement,render}
