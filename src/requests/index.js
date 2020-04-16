// const serverHome = 'http://47.99.56.231:98';
// const serverHome = 'https://wy.99rongle.com';
const serverHome = 'https://wy.24hwu.com';

// 用户密码登录
const loginWithPasswordAction = ({ callback = null, username, passwd }) => {
    const params = {
        username: username,
        passwd: passwd
    }
    postAction('/api/customer/login', callback, params);
}

// 退出登录
const logoutAction = ({ callback = null }) => {
    postAction('/api/customer/loginOut', callback);
}

// 获取验证码
const getIdentifyCode = ({ callback = null, phone }) => {
    const params = {
        phone: phone
    }
    postAction('/api/customer/getLoginCode', callback, params);
}

const getEditCode = ({ callback = null, phone }) => {
    const params = {
        phone: phone
    }
    postAction('/api/customer/getPasswdCode', callback, params);
}

const getWxLogin = ({ callback = null, id }) => {
    getAction(`/api/customer/app/auth?code=${id}`, callback);
}

const postWxLoginAuth = ({ callback, params }) => {
    postAction('/api/customer/app/authLogin', callback, params);
}


// 手机验证码登录
const loginWithCode = ({ callback = null, phone, smsCode, position, longitude, latitude, city }) => {
    const params = {
        phone: phone,
        smsCode,
        position,
        longitude,
        latitude,
        city
    }
    postAction('/api/customer/loginBySms', callback, params);
}

// 通过手机验证码修改密码
const getResetPasswordCode = ({ callback= null, params }) => {
    postAction('/api/customer/modPasswdBySms', callback, params);
}

// 搜索用户
const searchUser = ({ callback = null, pageNum, pageSize, orderByColumn = '', isAsc = true, skey = ''}) => {
    const params = {
        pageNum,
        pageSize,
        orderByColumn,
        isAsc,
        skey
    }

    getAction(`/api/customer/search?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&skey=${skey}`, callback);
}

// 用户数据提示，未读消息数
const unReadCount = ({ callback = null }) => {
    getAction('/api/customer/customerData', callback);
}

// 预览用户信息
const previewUser = ({ callback, id }) => {
    getAction(`/api/customer/customerData?id=${id}`);
}

// 获取登录信息
const getLoginInfo = ({ callback = null }) => {
    getAction('/api/customer/getInfo', callback);
}

// 获取用户会员信息
const getUserVipInfo = ({ callback = null }) => {
    getAction('/api/customer/vip/customerVip', callback);
}

// 修改密码
const changePassword = ({ callback = null, newPassword, oldPassword }) => {
    const params = {
        newPasswd: newPassword,
        oldPasswd: oldPassword
    }
    putAction('/api/customer/modPasswd', callback, params)
}

// 修改个人资料
const changePersonInfo = ({ callback = null, params }) => {
    putAction('/api/customer/modProfile', callback, params);
}

// 获取文章列表
const getArticleList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/article/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

// 获取今日文章
const getTodayArticle = ({ callback = null }) => {
    getAction('/api/customer/article/list', callback);
}

// 获取分类列表
const getAllCategory = ({ callback = null }) => {
    getAction('/api/customer/category/getAll', callback);
}

// 获取普通任务列表
const getClockTmp = ({ callback = null}) => {
    getAction('/api/customer/clockTmp/getAll', callback);
}

// 获取普通任务详情
const getClockTmpDetail = ({ callback = null, id }) => {
    getAction(`/api/customer/clockTmp/${id}`, callback);
}

// 个人普通任务列表
const getPersonalClockList = ({ callback = null, pageNum, pageSize, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/clock/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

// 获取某一天普通任务列表
const getPersonalClockByDay = ({ callback = null, day }) => {
    getAction(`/api/customer/clock/getDayClock?day=${day}`, callback);
}

// 获取个人普通任务详情
const getClockDetailById = ({ callback = null, id, day='' }) => {
    getAction(`/api/customer/clock/${id}?day=${day}`, callback);
}

// 删除个人普通任务
const deleteCustomerClock = ({ callback = null, id }) => {
    const params = {
        id: id
    }
    postAction('/api/customer/clock/remove', callback, params);
}

const addCustomerClock = ({ callback = null, params }) => {
    postAction('/api/customer/clock', callback, params);
}

const editCustomerClock = ({ callback = null, params }) => {
    putAction('/api/customer/clock', callback, params);
}

const getCustomerClockList = ({ callback = null, clock_id, pageNum, pageSize, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/clock/listRecord?clock_id=${clock_id}&pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const reportCustomerClock = ({ callback = null, params }) => {
    postAction('/api/customer/clock/reportRecord', callback, params);
}

const getSpecialClockList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = ''}) => {
    getAction(`/api/customer/spClock/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const getSpecialClockByDay = ({ callback = null, day }) => {
    getAction(`/api/customer/spClock/getDayClock?day=${day}`, callback);
}

const deleteSpecialClock = ({ callback = null, id }) => {
    const params = {
        id: id
    }
    postAction('/api/customer/spClock/remove', callback, params);
}

// 获取特殊任务详情
const getSpecialClockDetail = ({ callback = null, id }) => {
    getAction(`/api/customer/spClock/${id}`, callback);
}

// 添加某个特殊任务
const addSpecialClock = ({ callback = null, params }) => {
    postAction('/api/customer/spClock', callback, params);
}

// 修改某个特殊任务
const editSpecialClock = ({ callback = null, params }) => {
    putAction(`/api/customer/spClock`,callback, params);
}

const getSpecialClockRecordList = ({ callback = null, clock_id, pageNum, pageSize = 10, orderByColumn = '', isAsc = false, where = '' }) => {
    getAction(`/api/customer/spClock/listRecord?clock_id=${clock_id}&pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const postSpecialClockStatus = ({ callback = null, params }) => {
    postAction('/api/customer/spClock/reportRecord', callback, params);
}

// 联系人列表
const getContractList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/contact/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const getContractDetail = ({ callback = null, id }) => {
    getAction(`/api/customer/contact/${id}`, callback);
}

const editContract = ({ callback = null, params }) => {
    putAction('/api/customer/contact', callback, params);
}

// 我监护的人
const getGuardianList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    // /api/customer/contact/listMy
    getAction(`/api/customer/contact/listMy?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

// 推荐联系人列表
const recommendContractList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/contact/recommend/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

// 推荐联系人详情
const getRecommendContractDetail = ({ callback = null, id }) => {
    getAction(`/api/customer/contact/recommend/${id}`, callback);
}

const recommendContractApply = ({ callback = null, id, reason }) => {
    const params = {
        id: id,
        reason: reason
    }
    postAction('/api/customer/contact/recommend/apply', callback, params);
}

const getContractApplyList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/contact/apply/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const getContractApplyDetail = ({ callback = null, id }) => {
    getAction(`/api/customer/contact/apply/${id}`, callback);
}

const agreeApply = ({ callback = null, id }) => {
    const params = {
        id: id
    }
    putAction('/api/customer/contact/apply/agree', callback, params);
}

const rejectApply = ({ callback = null, id }) => {
    const params = {
        id: id
    }
    putAction('/api/customer/contact/apply/reject', callback, params);
}

// 联系人申请
const contractApply = ({callback = null, customer_id, reason }) => {
    const params = {
        customer_id: customer_id,
        reason: reason
    }
    postAction('/api/customer/contact/apply', callback, params);
}
// 联系人被申请
const contractApplyByOther = ({ callback = null, customer_id}) => {
    const params = {
        customer_id: customer_id
    }
    postAction('/api/customer/contact/beApply', callback, params);
}

const getVipSet = ({ callback = null }) => {
    getAction('/api/customer/vip/vipRule', callback);
}

const getNormalUserRule = ({ callback = null }) => {
    getAction('/api/customer/vip/customerRule', callback);
}

// 签到
const signAction = ({ callback = null }) => {
    postAction('/api/customer/sign', callback);
}

const getSignList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/sign/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const getUserOpinionList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/opinion/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const getUserOpinionDetail = ({ callback = null, id }) => {
    getAction(`/api/customer/opinion/${id}`, callback);
}

const addUserOpinion = ({ callback = null, params }) => {
    postAction('/api/customer/opinion', callback, params);
}

const getMessageList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/message/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const getMessageDetail = ({ callback = null, id }) => {
    getAction(`/api/customer/message/${id}`, callback);
}

const setMessageRead = ({ callback = null, params }) => {
    putAction('/api/customer/message', callback, params);
}

const getUserAgreement = ({ callback = null }) => {
    getAction('/api/customer/setting/customerAgreement', callback);
}

const getUserSignRule = ({ callback = null }) => {
    getAction('/api/customer/setting/signRule', callback);
}

const getVipOrderList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/vipOrder/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const getVipOrderDetail = ({ callback = null, id }) => {
    getAction(`/api/customer/vipOrder/${id}`, callback);
}

const previewVipOrder = ({ callback = null, use_score, time, meta }) => {
    const params = {
        use_score: use_score,
        time: time,
        meta: meta
    }
    postAction('/api/customer/vipOrder/prepare', callback, params);
}

const createVipOrder = ({ callback = null, use_score, time, meta }) => {
    const params = {
        use_score: use_score,
        time: time,
        meta: meta
    }
    postAction('/api/customer/vipOrder/create', callback, params);
}

const cancelVipOrder = ({ callback = null, id }) => {
    const params = {
        id: id
    }
    putAction('/api/customer/vipOrder/cancel', callback, params);
}

const payVipOrder = ({ callback = null, order_id, paymode }) => {
    const params = {
        order_id: order_id,
        paymode: paymode
    }
    postAction('/api/customer/vipOrder/pay', callback, params);
}

const getPersonEmergencyList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/emergency/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const getEmergencyDetail = ({ callback, id }) => {
    getAction(`/api/customer/emergency/${id}`, callback);
}

const addEmergencyItem = ({ callback, params }) => {
    postAction('/api/customer/emergency', callback, params);
}

const editEmergencyItem = ({ callback, params }) => {
    putAction('/api/customer/emergency',callback, params);
}

const getPersonScoreList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/score/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}
const getPersonQuestionList = ({ callback = null, pageNum, pageSize = 10, orderByColumn = '', isAsc = true, where = '' }) => {
    getAction(`/api/customer/secret/list?pageNum=${pageNum}&pageSize=${pageSize}&orderByColumn=${orderByColumn}&isAsc=${isAsc}&where=${where}`, callback);
}

const getPersonQuestionDetail = ({ callback = null, id }) => {
    getAction(`/api/customer/secret/${id}`, callback);
}

const addPersonQuestion = ({ callback = null, params }) => {
    postAction(`/api/customer/secret/`, callback, params);
}

const editPersonQuestion = ({ callback = null, params }) => {
    putAction(`/api/customer/secret/`, callback, params);
}

const addUserPushInfo = ({ callback = null, id }) => {
    const params = {
        uuid: id
    }
    postAction(`/api/customer/app`, callback, params);
}

const getOssToken = ({ callback = null }) => {
    getAction('/api/customer/oss', callback);
}


postAction = (url, callback = null, params = null) => {
    console.log('postAction')
    let opts = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": 'application/json;charset=utf-8',
            "Connection": "keep-alive"
        },
        timeout: 60 * 1000,
    }

    if (params != null) {
        opts['body'] = JSON.stringify(params);
    }

    console.log('opts', opts);

    fetch(serverHome + url, opts).then((response) => {
        console.log('fetch', response);
        if (response.ok) {
            return response.json();
        }
    }).then((responseJson) => {
        console.log('responseJson', responseJson);
        if (callback) {
            callback(responseJson);
        }
    }).catch((error) => {
        console.log('error', error)
        if (callback) {
            callback(error);
        }
    }).finally(() => {

    })
}

getAction = (url, callback = null) => {
    let opts = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": 'application/json;charset=utf-8',
            "Connection": "keep-alive"
        },
        timeout: 60 * 1000,
    }

    fetch(serverHome + url, opts).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((responseJson) => {
        console.log('get responseJson', responseJson, url);
        if (callback) {
            callback(responseJson);
        }
    }).catch((error) => {
        console.log('error', error)
        if (callback) {
            callback(error);
        }
    }).finally(() => {

    })
}

putAction = (url, callback = null, params = null) => {
    let opts = {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": 'application/json;charset=utf-8',
            "Connection": "keep-alive"
        },
        timeout: 60 * 1000,
    }

    if (params != null) {
        opts['body'] = JSON.stringify(params);
    }

    fetch(serverHome + url, opts).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((responseJson) => {
        if (callback) {
            callback(responseJson);
        }
    }).catch((error) => {
        console.log('error', error)
        if (callback) {
            callback(error);
        }
    }).finally(() => {

    })
}

export {
    loginWithPasswordAction,
    logoutAction,
    getIdentifyCode,
    loginWithCode,
    getResetPasswordCode,
    searchUser,
    unReadCount,
    previewUser,
    getLoginInfo,
    getUserVipInfo,
    changePassword,
    changePersonInfo,
    getArticleList,
    getTodayArticle,
    getAllCategory,
    getClockTmp,
    getClockTmpDetail,
    getPersonalClockList,
    getPersonalClockByDay,
    getClockDetailById,
    deleteCustomerClock,
    addCustomerClock,
    editCustomerClock,
    getCustomerClockList,
    reportCustomerClock,
    getSpecialClockList,
    getSpecialClockByDay,
    deleteSpecialClock,
    getSpecialClockDetail,
    addSpecialClock,
    editSpecialClock,
    getSpecialClockRecordList,
    postSpecialClockStatus,
    getContractList,
    getContractDetail,
    editContract,
    recommendContractList,
    getRecommendContractDetail,
    recommendContractApply,
    getContractApplyList,
    getContractApplyDetail,
    agreeApply,
    rejectApply,
    contractApply,
    contractApplyByOther,
    getVipSet,
    getNormalUserRule,
    signAction,
    getSignList,
    getUserOpinionList,
    getUserOpinionDetail,
    addUserOpinion,
    getMessageList,
    getMessageDetail,
    setMessageRead,
    getUserAgreement,
    getUserSignRule,
    getVipOrderList,
    getVipOrderDetail,
    previewVipOrder,
    createVipOrder,
    cancelVipOrder,
    payVipOrder,
    getPersonEmergencyList,
    getEmergencyDetail,
    addEmergencyItem,
    editEmergencyItem,
    getPersonScoreList,
    getPersonQuestionList,
    getPersonQuestionDetail,
    addPersonQuestion,
    editPersonQuestion,
    getEditCode,
    getGuardianList,
    addUserPushInfo,
    getWxLogin,
    postWxLoginAuth,
    getOssToken
}

