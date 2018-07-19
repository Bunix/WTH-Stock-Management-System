<template>
  <v-container id="invoice-template">
    <div v-for="invoice in invoiceLists" :key="invoice.id">
      <table width="798" cellspacing="0" cellpadding="5" border="1" style="border-collapse: collapse" bordercolor="#000000">
        <tbody>
          <tr>
            <td align="center" bgcolor="#FFFFFF">
              <div style="margin: 0; width: 100%;">
                <template>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs6 style="text-align: left">
                        <h2 style="line-height: 1.5; padding: 2rem 0">Webike (Thailand) Co., Ltd.</h2>
                      </v-flex>
                      <v-flex xs6 style="text-align: right">
                        <h2 style="line-height: 1.5; padding: 2rem 0">Receip / Tax Invoice / Delivery Order</h2>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs6 style="text-align: left">
                        <p>
                          9/306 UM Tower, Ramkhamhaeng Rd.,<br>
                          Suanluang, Suanluang, Bangkok 10250, Thailand.<br>
                          Phone: +66 2 719 9992 Fax: +66 2 717 3045<br>
                          <b>Tax ID: 0105558132611 (Head Office)</b>
                        </p>
                      </v-flex>
                      <v-flex xs6 style="text-align: right">
                        <p><b>No.</b> {{ invoice.order_number }} </p>
                        <p><b>Date</b> {{ invoice.paidDate }} </p>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </template>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#FFFFFF">
              <div style="margin: 0; width: 100%;">
                <template>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs4 style="text-align: left">
                        <h3>Invoice Address:</h3>
                        <p>
                          {{ invoice.delivery_infomation.delivery_name }}
                        </p>
                        <p>
                          {{ invoice.delivery_infomation.delivery_address }}
                        </p>
                        <p>
                          Tel. {{ invoice.mobile }}
                        </p>
                      </v-flex>
                      <v-flex xs4 style="text-align: left">
                        <h3>Delivery Address:</h3>
                        <p>
                          {{ invoice.delivery_infomation.delivery_name }}
                        </p>
                        <p>
                          {{ invoice.delivery_infomation.delivery_address }}
                        </p>
                        <p>
                          Tel. {{ invoice.mobile }}
                        </p>
                      </v-flex>
                      <v-flex xs4 style="text-align: right">
                        <v-container grid-list-md text-xs-center>
                          <v-layout row wrap>
                            <v-flex xs6 style="text-align: right">
                              <h4>Order No.</h4>
                            </v-flex>
                            <v-flex xs6 style="text-align: left">
                              <p>{{ invoice.order_number }}</p>
                            </v-flex>
                            <v-flex xs6 style="text-align: right">
                              <h4>Payment Method</h4>
                            </v-flex>
                            <v-flex xs6 style="text-align: left">
                              <p>{{ invoice.payment_method }}</p>
                            </v-flex>
                            <v-flex xs6 style="text-align: right">
                              <h4>Payment Date</h4>
                            </v-flex>
                            <v-flex xs6 style="text-align: left">
                              <p>{{ invoice.paidDate }}</p>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </template>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#FFFFFF">
              <table width="98%" border="0" cellpadding="5" cellspacing="1" style="background-color:#A2A2A2">
                <tbody>
                  <tr>
                    <td width="16%" bgcolor="#FFFFFF">會員名稱:</td>
                    <td width="26%" bgcolor="#FFFFFF"> อดิศร </td>
                    <td width="14%" bgcolor="#FFFFFF">連絡電話:</td>
                    <td width="15%" bgcolor="#FFFFFF">T:
                      <br> M: 0845434257</td>
                    <td width="14%" bgcolor="#FFFFFF">訂購時間:</td>
                    <td width="15%" bgcolor="#FFFFFF"> 2018-06-18 12:13:04 </td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF">統一編號:</td>
                    <td bgcolor="#FFFFFF"> </td>
                    <td bgcolor="#FFFFFF">付款方式：</td>
                    <td bgcolor="#FFFFFF">Credit card</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF">收件人 :</td>
                    <td bgcolor="#FFFFFF">อดิศร มานุจำ</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF">配送地址:</td>
                    <td bgcolor="#FFFFFF">10130 , สมุทรปราการ/Samut Prakarn พระประแดง/Phra Pradaeng,เทศบาลเมืองพระประแดง/Talat 119/14 สุขสวัสดิ์37/3
                      ต.บางพึ่ง อ.พระประแดง จ.สมุทรปราการ10130</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                    <td bgcolor="#FFFFFF">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#FFFFFF">
              <table width="98%" style="background-color:#A2A2A2" cellpadding="5" cellspacing="1">
                <tbody>
                  <tr>
                    <td width="23" bgcolor="#FFFFFF">No.</td>
                    <td width="158" bgcolor="#FFFFFF">品牌</td>
                    <td colspan="3" bgcolor="#FFFFFF">商品名稱</td>
                    <td colspan="2" bgcolor="#FFFFFF">商品編號</td>
                    <td width="40" bgcolor="#FFFFFF">數量</td>
                    <td width="80" bgcolor="#FFFFFF" align="right">單價</td>
                    <td width="80" bgcolor="#FFFFFF" align="right">小計</td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF">1</td>
                    <td bgcolor="#FFFFFF">TANAX</td>
                    <td colspan="3" bgcolor="#FFFFFF"> YANASHIRO x TANAX Shark Mirror


                    </td>
                    <td colspan="2" bgcolor="#FFFFFF"> AOS-104-BB</td>
                    <td bgcolor="#FFFFFF">1</td>
                    <td align="right" bgcolor="#FFFFFF">฿3,075</td>
                    <td align="right" bgcolor="#FFFFFF">฿3,075</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#FFFFFF">
              <table width="98%" style="background-color:#A2A2A2" cellpadding="5" cellspacing="1">
                <tbody>
                  <tr>
                    <td width="550" colspan="7" rowspan="1" bgcolor="#FFFFFF">&nbsp;備註 </td>
                    <td colspan="2" bgcolor="#FFFFFF">商品費用合計</td>
                    <td width="80" align="right" bgcolor="#FFFFFF">&nbsp;฿3,075</td>
                  </tr>
                  <tr>
                    <td width="550" colspan="7" rowspan="5" bgcolor="#FFFFFF">&nbsp; </td>
                    <td colspan="2" bgcolor="#FFFFFF">運費</td>
                    <td align="right" bgcolor="#FFFFFF"> ฿0</td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF">手續費</td>
                    <td align="right" bgcolor="#FFFFFF"> ฿0 </td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF">折扣</td>
                    <td align="right" bgcolor="#FFFFFF"> -฿0 </td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF">總計</td>
                    <td align="right" bgcolor="#FFFFFF">&nbsp;฿3,075 </td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF"></td>
                    <td bgcolor="#FFFFFF"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      invoiceLists: this.$store.getters.getInvoiceLists,
      orderNumber: 'GLIV1807-002',
      orderDate: '4-Jul-18'
    }
  }
}
</script>

<style scoped>
  p {
    margin-bottom: 0; 
  }
  td {
    padding: 1rem;
  }
  .font-red {
    color: rgb(230, 49, 49)
  }

  .font-green {
    color: rgb(17, 193, 87)
  }

  #invoice-page {
    width: 100%;
    min-height: 100%;
  }
</style>