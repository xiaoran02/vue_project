import request from "@/utils/request";

//获取SPU列表数据的接口
// /admin/product/{page}/{limit} get page limit category3Id
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });

//获取SPU信息
// /admin/product/getSpuById/{spuId}  get
export const reqSpu = (spuId) =>
  request({ url: `/admin/product/getSpuById/${spuId}`, method: "get" });

//获取品牌信息
// /admin/product/baseTrademark/getTrademarkList  get
export const reqTradeMarkList = () =>
  request({
    url: "/admin/product/baseTrademark/getTrademarkList",
    method: "get",
  });

//获取SPU图标的接口
// /admin/product/spuImageList/{spuId}  get
export const reqSpuImageList = (spuId) =>
  request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" });

//获取平台全部销售属性---整个平台销售属性一共三个
// /admin/product/baseSaleAttrList get
export const reqBaseSaleAttrList = () =>
  request({ url: "/admin/product/baseSaleAttrList", method: "get" });

//修改或者添加SPU：两个接口需要的参数大致一样，区别是商品id有无
export const reqAddOrUpdateSpu = (spuInfo) => {
  //携带的参数有id --- 修改spu
  if (spuInfo.id) {
    return request({
      url: "/admin/product/updateSpuInfo",
      method: "post",
      data: spuInfo,
    });
  } else {
    //携带的参数不带id --- 添加spu
    return request({
      url: "/admin/product/savesSpuInfo",
      method: "post",
      data: spuInfo,
    });
  }
};

//删除SPU
// /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) =>
  request({ url: `/admin/product/deleteSpu/${spuId}`, method: "delete" });

//添加SKU
///admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo) =>
  request({ url: "/admin/product/saveSkuInfo", method: "post", data:skuInfo });

//获取SKU列表数据的接口
// /admin/product/findBySpuId/{spuId}   get
export const reqSkuList = (spuId) =>
  request({ url: `/admin/product/findBySpuId/${spuId}`, method: "get" });
