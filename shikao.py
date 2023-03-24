from notify import send
import requests
from utils import compare

def get_shikao():
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Content-Length': '0',
        'Cookie': 'SESSION=09a73d41-c22f-43dc-8ac8-e1aed55ad2f8; Hm_lvt_a2d6ff8cdbd0402fc123fac320c9324d=1673950466,1674010353,1674016129,1674881430',
        'DNT': '1',
        'Origin': 'http://bm.shacs.gov.cn',
        'Proxy-Connection': 'keep-alive',
        'Referer': 'http://bm.shacs.gov.cn/zlxt/zlxt/tz/remindPage.jsp',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.44',
        'X-Requested-With': 'XMLHttpRequest',
    }

    response = requests.post('http://bm.shacs.gov.cn/zlxt/action?RemindPageAction=1', headers=headers)
    
    return response.text

st, ret = compare(get_shikao, 'shikao.txt')
if not st:
    send("上海市考", "上海市考有更新了！")