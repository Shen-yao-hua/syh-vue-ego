const base = {
    baseUrl: "/api",
    login: "/api/login",  // 登陆
    register: "/api/register", // 注册
    selectTbItemAllByPage: "/api/backend/item/selectTbItemAllByPage", // 商品查询接口
    total: "/api/total", // 商品总条数
    insertTbItem:"/api/backend/item/insertTbItem", //增加商品
    search: '/api/search',// 模糊查询
    selectItemCategoryByParentId: "/api/backend/itemCategory/selectItemCategoryByParentId",// 类目选择
    deleteItemById:'/api/backend/item/deleteItemById', //删除商品
    preUpdateItem:'/api/backend/item/preUpdateItem', //预更新接口：点击编辑取到这条数据
    updateTbItem:'/api/backend/item/updateTbItem', //修改商品
    preCategory:'/api/preCategory', //单一商品类目给编辑时候用
    selectItemParamAll:'/api/backend/itemParam/selectItemParamAll',//获取规格参数数据
    paramsSearch:'/api/params/search', //规格参数页面模糊查询
    paramsDelete:'/api/params/delete', //规格参数删除
    paramsTotal:'/api/params/total',  //规格参数总页数

    insertItemParam:'/api/backend/itemParam/insertItemParam',//规格参数添加
    
    paramsItem:'/api/product/params/paramsItem', // 获取规格参数数据添加到产品


    selectContentCategoryByParentId:'/api/content/selectContentCategoryByParentId',//内容分类管理 导航查询
    insertContentCategory:'/api/content/insertContentCategory',//内容分类管理 增加子导航
    updateContentCategory:'/api/content/updateContentCategory',//内容分类管理 修改子导航
    deleteContentCategoryById:'api/content/deleteContentCategoryById',//内容分类管理 删除子导航
    insertTbContent:'api/content/insertTbContent',//内容分类管理 内容增加
    
    deleteContentByIds:'api/content/deleteContentByIds',//内容分类管理 内容删除
    selectTbContentAllByCategoryId:'api/content/selectTbContentAllByCategoryId',// 内容分类管理 内容查询

}

export default base;