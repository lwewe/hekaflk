import setaxios from "@/utils/setaxios";
import store from "@/store";

/**
 * 影院列表
 */
export function getBannerList() {
    return setaxios.post("/Film/yclbt", {
        channel_no: store.state.channel_no,
    });
}

//首页  轮播图
export function getIndexBannerList() {
    return setaxios.post("/Film/sylbt", {
        channel_no: store.state.channel_no,
    });
}