/*
5 8 * * * ck_ccb.js
*/
const utils = require('./utils');
const Env = utils.Env;
const $ = new Env('建行生活');
const getData = utils.getData;
const fetch = require('node-fetch');
const notify = require('./sendNotify');
const AsVow = getData().CCB_LIFE;
let info = '';
const headers = {
    'CHANNEL_NUM': `2`,
    'MID': `146`,
    'Accept-Encoding': `gzip, deflate, br`,
    'Connection': `keep-alive`,
    'Content-Type': `application/json;charset=utf-8`,
    'Origin': `file://`,
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/CloudMercWebView/UnionPay/1.0 CCBLoongPay`,
    'mbskey': `TGSjiMbYit7V85HmrMjZJ9Okh.uRZ0oh8%2CuAM4zUwLIMz5bVor0kYBMVUbsoL.NUU7BUCAeU6LPgBA1SIb`,
    'Host': `yunbusiness.ccb.com`,
    'clientInfo': `{"appVersion":"2.1.2.001","resourseBundleVersion":"","deviceId":"4D11FDD9-C4AD-497B-8C57-3BDECEC3682D","deviceModel":"iPhone 11","osType":"iOS","osVersion":"16.0.2","mac":"","dFingerprint":"35782c6f-a502-4bb6-8daf-f5e0fdcb0b81","gpsCityCode":"430100"}`,
    'skey': `g7vodv`,
    'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
    'Accept': `application/json,text/javascript,*/*`
};

ccb_life();

async function ccb_life() {
    if (AsVow) {
        for (i in AsVow) {
            bodydata_str = AsVow[i].body;
            headers['skey'] = AsVow[i].skey;
            username = AsVow[i].name;
            const result = await sign(JSON.parse(bodydata_str));
            if (result.errCode === '0') {
                info += `【${
                    AsVow[i].name
                }】签到成功`;
            } else {
                info += `【${
                    AsVow[i].name
                }】签到失败，${
                    result.errMsg
                }\n`;
            }
        }
        console.log(info)
        await notify.sendNotify('建行生活', info);
    } else {
        info = '签到失败：请先获取Cookie⚠️';
        await notify.sendNotify('建行生活', info);
    } $.done()
}

// 签到
function sign(bodydata_str) {
    url = `https://yunbusiness.ccb.com/clp_coupon/txCtrl?txcode=A3341A040`
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(bodydata_str)
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (e) {
            const error = '签到出现错误，请检查⚠️';
            console.log(error + '\n' + e);
            reject(e);
        });
    });
}


module.exports = ccb_life;
