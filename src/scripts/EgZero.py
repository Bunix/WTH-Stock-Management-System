
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import ast

import json

from bs4 import BeautifulSoup
import re
import os

class EgZero:
  def __init__(self, usernameStr, passwordStr):
    print(usernameStr)
    print(passwordStr)

    self.site_url = 'http://209.58.164.167'

    # Goto Eg-Zero page
    self.browser = webdriver.Chrome()
    self.browser.get(u'{}/auth/login'.format(self.site_url))

    # fill in username and hit the next button.
    username = self.browser.find_element_by_name('email')
    username.send_keys(usernameStr)

    # wait for transition then continue to fill items.
    password = self.browser.find_element_by_name('password')
    password.send_keys(passwordStr)

    self.browser.implicitly_wait(30)
 
    signInButton = self.browser.find_element_by_class_name('btn-primary')
    signInButton.click()

  def getOrderNumber(self, status):
    # Jump to get ordering data from api status = 6.
    self.browser.get('http://209.58.164.167/api/orders/getOrdersNumber?order_status={}'.format(status))
    self.browser.implicitly_wait(30)

    # wait until json data loaded.
    wait = WebDriverWait(self.browser, 10)
    wait.until(EC.presence_of_element_located((By.XPATH, '/html/body/pre')))

    ordering_number = self.browser.find_elements_by_xpath('/html/body/pre')
    
    return list(map(lambda number: ast.literal_eval(number.text), ordering_number))
      
