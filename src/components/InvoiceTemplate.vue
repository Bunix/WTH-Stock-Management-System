<template>
  <v-container id="invoice-template">
    <div v-for="invoice in invoiceLists" :key="invoice.id" style="height: 1688px">
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
              <table width="98%" style="background-color:#A2A2A2" cellpadding="5" cellspacing="1">
                <tbody>
                  <tr>
                    <td width="40" bgcolor="#FFFFFF"><b>No.</b></td>
                    <td width="250" bgcolor="#FFFFFF"><b>Description</b></td>
                    <td width="40" bgcolor="#FFFFFF"><b>Color</b></td>
                    <td width="40" bgcolor="#FFFFFF"><b>Price / Unit (THB)</b></td>
                    <td width="40" bgcolor="#FFFFFF"><b>Qty</b></td>
                    <td width="40" bgcolor="#FFFFFF"><b>Total Amount (THB)</b></td>
                  </tr>
                  <tr v-for="(item, index) in invoice.items" :key="index">
                    <td bgcolor="#FFFFFF">{{ index + 1 }}</td>
                    <td bgcolor="#FFFFFF">{{ `${item.product_manufacturer}: ${item.product_name}` }}</td>
                    <td bgcolor="#FFFFFF">{{ item.product_option_name }}</td>
                    <td bgcolor="#FFFFFF">{{ item.product_price }}</td>
                    <td bgcolor="#FFFFFF">{{ item.product_quantity }}</td>
                    <td bgcolor="#FFFFFF">{{ item.product_price * item.product_quantity }}</td>
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
                    <td width="550" colspan="7" rowspan="5" bgcolor="#FFFFFF"></td>
                    <td colspan="2" bgcolor="#FFFFFF"><b>Total Amount</b></td>
                    <td width="80" align="right" bgcolor="#FFFFFF">{{ `฿${parseFloat(invoice.total_amount).toFixed(2)}` }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF"><b>Coupon Discount</b></td>
                    <td align="right" bgcolor="#FFFFFF">{{ parseFloat(invoice.coupon).toFixed(2) }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF"><b>Freight</b></td>
                    <td align="right" bgcolor="#FFFFFF">{{ invoice.Freight }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF"><b>Net Amount</b></td>
                    <td align="right" bgcolor="#FFFFFF">{{ `฿${(parseFloat(invoice.total_amount).toFixed(2) - invoice.coupon).toFixed(2)}` }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF"><b>Value Added Tax 7%</b></td>
                    <td align="right" bgcolor="#FFFFFF">{{ `฿${(parseFloat(invoice.total_amount).toFixed(2) * (7/100)).toFixed(2)}` }}</td>
                  </tr>
                  <tr>
                    <td width="550" colspan="7" rowspan="1" bgcolor="#eee">{{ bahtOnly(`${(parseFloat(invoice.total_amount).toFixed(2) * (107/100)).toFixed(2)}`) }}</td>
                    <td colspan="2" bgcolor="#eee"><b>Grand Total</b></td>
                    <td bgcolor="#eee">{{ `฿${(parseFloat(invoice.total_amount).toFixed(2) * (107/100)).toFixed(2)}` }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#FFFFFF">
              <div style="margin: 0; width: 100%;">
                <template>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs12 style="text-align: left">
                        <h4 style="line-height: 1.5; margin-bottom: 0.5rem;">Remark:</h4>
                        <ol style="padding-left: 1rem">
                          <li>
                            Defective items MUST BE reported within 7 days after receiving the package (and in the original packaging, if possible).
                            You must inform us what the defect is and provide us your order number. WE WILL NOT ACCEPT ANY REPORT AFTER 7 DAYS UPON RECEIVE.
                          </li>
                          <li>
                            Please feel free to contact us with any comments, questions or suggestions that you may have, we will be happy to assist you.
                          </li>
                          <li>
                            For further information on the process, please see our Return Rolicy
                          </li>
                        </ol>
                        <h4 style="line-height: 1.5; padding: 2rem 0 0.5rem">Received the above merchandises in good order and condition</h4>
                        <hr>
                        <v-container grid-list-md text-xs-center style="height: 100px">
                          <v-layout row wrap>
                            <v-flex xs6 class="text-xs-left">
                              <h5 style="line-height: 1.5; padding: 0.5rem 0">Received by:</h5>
                            </v-flex>
                            <v-flex xs6 class="text-xs-left">
                              <h5 style="line-height: 1.5; padding: 0.5rem 0">Received by:</h5>
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
            <td>
              <p class="text-xs-center">
                Thank you for you bussiness.
              </p>
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
  },
  methods: {
    bahtOnly(numStr) {
      // console.log(numStr)
      const textNumber = ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ']
      const textUnit = ['สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน']

      const [integer] = numStr.match(/.*(?=\.)/g)
      const [decimal] = numStr.match(/(?<=\.)[^.]*$/g)
      const maxUnit = integer.length - 2

      const fullTextNumber =  [...integer].map((number, i) => {
        const n = parseInt(number)
        const num =  textNumber[n - 1] !== undefined ? textNumber[n - 1] : ''
        const unit = maxUnit - i >= 0  ? textUnit[maxUnit - i] : ''
        if(n === 1 && i === maxUnit) {
          return num !== '' ? unit : ''  
        }
        if(n === 1 && i === integer.length - 1 && parseInt(integer[maxUnit]) !== 0) {
          return 'เอ็ด'
        }
        if(n === 1 && integer[i+1] === maxUnit) {
          return num !== '' ? num + unit : ''
        }
        if(n === 2 && i === maxUnit) {
          return num !== '' ? 'ยี่' + unit : ''  
        }
        return num !== '' ? num + unit : ''
      }).join('')

      const fullUnitText = [...decimal].map((number, i) => {
        const n = parseInt(number)
        if(n === 1 && i == 0) {
          return 'สิบ'
        }
        if(n === 2 && i == 0) {
          return 'ยี่สิบ'
        }
        if(i === 0) {
          return textNumber[n - 1] !== undefined ? `${textNumber[n - 1]}สิบ` : ''
        }
        if(n === 0 && i == 1) {
          return ''
        }
        if(n === 1 && i == 1) {
          return 'เอ็ด'
        }
        if(n === 0) {
          return 'ศูนย์'
        }
        if(i == 1) {
          return textNumber[n - 1] !== undefined ? `${textNumber[n - 1]}` : ''
        }
      }).join('')

      return `${fullTextNumber}บาท${fullUnitText === 'ศูนย์ศูนย์' ? 'ถ้วน' : fullUnitText + 'สตางค์'}`
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