<template>
  <v-card id="invoice-page">
    <v-toolbar flat color="white">
      <v-tooltip bottom>
        <span slot="activator">
          <v-btn icon class="mx-0" @click.native="addInvoice">
            <v-icon color="blue darken-2">add_circle</v-icon>
          </v-btn>
        </span>
        <span>Add New Invoice</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-btn color="primary" @click.native="print('updateOrder')">
        <v-icon left>print</v-icon> Print & Update Order
      </v-btn>
      <v-btn @click.native="print">Print</v-btn>
    </v-toolbar>

    <v-spacer></v-spacer>

    <v-container grid-list-md id="print-area">
      <v-layout row wrap>
        <!-- Invoice Here -->
        <table width="798" cellspacing="0" cellpadding="5" border="1" style="border-collapse: collapse" bordercolor="#000000">
          <tbody>
            <tr>
              <td align="center" bgcolor="#FFFFFF">
                <div style="margin: 0 auto; width: 500px;">
                  <img style="float: left; display: block; margin: 10px 30px 0 70px;" src="https://www.webike.tw/assets/images/shared/webike_shop_logo.png"
                    alt="">
                  <h2 style="float: left; line-height: 1.5; padding: 2rem 0">商品訂購單</h2>
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#FFFFFF">
                <table width="98%" border="0" cellpadding="5" cellspacing="1" style="background-color:#A2A2A2">
                  <tbody>
                    <tr>
                      <td width="12%" bgcolor="#FFFFFF" rowspan="2">訂單編號:</td>
                      <td width="20%" bgcolor="#FFFFFF" rowspan="2">
                        <span style="font-size:17px;">
                          <b> WTH180618G0127 </b>
                        </span>
                      </td>
                      <td width="16%" bgcolor="#FFFFFF">查詢編號:</td>
                      <td width="18%" bgcolor="#FFFFFF">________________</td>
                      <td width="12%" bgcolor="#FFFFFF">查詢人:</td>
                      <td width="18%" bgcolor="#FFFFFF">________________</td>
                    </tr>
                    <tr>
                      <td bgcolor="#FFFFFF"></td>
                      <td width="18%" bgcolor="#FFFFFF">________________</td>
                      <td bgcolor="#FFFFFF"></td>
                      <td width="18%" bgcolor="#FFFFFF">________________</td>
                    </tr>
                    <tr>
                      <td bgcolor="#FFFFFF">會員屬性:</td>
                      <td bgcolor="#FFFFFF">General</td>
                      <td bgcolor="#FFFFFF">日本訂單編號：</td>
                      <td bgcolor="#FFFFFF">________________</td>
                      <td bgcolor="#FFFFFF">經辦:</td>
                      <td bgcolor="#FFFFFF">________________</td>
                    </tr>
                  </tbody>
                </table>
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
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import html2canvas from 'html2canvas'
/* eslint-disable */
export default {
  data() {
    return {
      invoiceLists: this.$store.getters.getInvoiceLists,
    }
  },
  methods: {
    addInvoice() {
      console.log('Add Invoice')
    },
    print(printOption) {
      // Render data as image and attach to new window then call print function
      html2canvas(document.querySelector('#print-area'), {
        dpi: 150,
        width: 1240,
        height: 1754,
        logging: false
      })
      .then(canvas => {
        const myWindow = window.open()
        myWindow.document.body.appendChild(canvas)
        myWindow.print()
        myWindow.close()
      })
      if(printOption === 'updateOrder') {
        this.$store.dispatch('updateOrder', this.invoiceLists)
      }
    }
  },
  mounted() {
    // Generate barcode when element is render.
    this.$nextTick(() => {
      // this.barcodeLists.forEach((element, i) => {
      //   JsBarcode(`#barcode-${this.barcodeStartPos + i}`, element.basicInformation.orderNumber)
      // })
    })
  }
}
</script>

<style scoped>
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