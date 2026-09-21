import setaxios from "@/utils/setaxios";
import store from "@/store";

// 提货券列表
export function getCardList(data) {
    return setaxios.post("/Card/lists", {
        channel_no: store.state.channel_no,
        ...data
    });
}
// 提货券列表
export function getCardInfo(data) {
    return setaxios.post("/Card/show", {
        channel_no: store.state.channel_no,
        ...data
    });
}
// 不可用提货券
export function getEnableCard(data) {
    return setaxios.post("/Card/nucard", {
        channel_no: store.state.channel_no,
        ...data
    });
}

