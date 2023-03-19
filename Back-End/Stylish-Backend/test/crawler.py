import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import json

CACO_WOMAN = 'https://www.caco.com.tw/mkgdispgroup/dispunit/141150/1'
CACO_MAN = 'https://www.caco.com.tw/mkgdispgroup/dispunit/131150/1'
CACO_ACC = 'https://www.caco.com.tw/mkgdispgroup/dispunit/148200/1'

URLS = [CACO_MAN, CACO_WOMAN, CACO_ACC]
CATEGORY = ['men', 'women', 'accessories']


def scroll_down(driver):
    for i in range(300):
        driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ARROW_DOWN)


def main():
    # 使用 Chrome 瀏覽器
    driver = webdriver.Chrome()

    # for i in range(3):
    cat = CATEGORY[2]

    # 載入網頁
    driver.get(URLS[2])

    # 等待直到某個元素出現在 DOM 中
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, 'prodlist'))
    )

    # scroll down
    scroll_down(driver)

    time.sleep(1)

    # 取得元素的內容
    products = element.find_elements(By.ID, 'prod')
    # images, texts = [], []
    dic = {'data': []}
    for product in products:
        try:
            img = product.find_element(By.TAG_NAME, 'img')
            # images.append(img.get_attribute('src'))

            img_src = img.get_attribute('src')
            texts = product.text.split()

            if len(texts) == 3:
                price = texts[0][3:]
                title = texts[2]
                product_obj = {
                    'price': price,
                    'title': title,
                    'img': img_src
                }

                dic['data'].append(product_obj)
            # texts.append(product.text.split())
        except:
            pass

    print(dic)

    json_obj = json.dumps(dic, indent=4)

    with open(f'caco_datas_{cat}', 'w') as outfile:
        outfile.write(json_obj)

    # 關閉瀏覽器
    driver.quit()


if __name__ == '__main__':
    main()
