export const DefaultPagesize = 10;
export const amt_width = 120;
export const qtty_width = 130;
export const date_width = 70;
export const custodycd_width = 110;
export const symbol_width = 100;
export const CUTOMERTLID = '686868';//la kh
export const SRTYPE_CR = "CR";//huy ban doi voi lenh sip
export const SRTYPE_AR = "AR";//sua ban doi voi lenh sip
export const SRTYPE_NS = "NS";//mua
export const SRTYPE_NR = "NR";//ban
export const SRTYPE_SW = "SW";//hoan doi
export const CUSTYPE_CN = "CN";//loai kh ca nhan
export const CUSTYPE_TC = "TC";//loai kh to chuc
export const IDTYPE_004 = "004";//loai DKSH chung thu khac
export const IDTYPE_005 = "005";//loai DKSH giay phep KD
export const IDTYPE_009 = "009";//loai DKSH trading code
export const COUNTRY_234 = "234";//quoc tich VN
export const ACTYPE_TT = "TT";//loai kh thong thuong
export const GRINVESTOR_TN = "TN"//phan loai KH trong nuoc
export const GRINVESTOR_NN = "NN"//phan loai KH nuoc ngoai
export const COLORNS = "#0076a3"//mau lenh mua
export const COLORNR = "#808284"//mau lenh ban
export const COLORSW = "#ef4322"//mau lenh hoan doi
export const COLORGRAY = "rgb(128, 130, 132)"
export const COLORBLACK = "#808284"
export const IMGMAXW = 350//chieu rong hinh
export const IMGMAXH = 300//chieu dai hinh
export const LANGUAGE_KEY = 'vfmLanguage'
// export const ArrSpecial = ['IDCODE', 'PHONE', 'ORDERID', 'MOBILE', 'BANKCODE', 'CITYBANK', 'TAXNO', 'IDTYPE', 
// 'BANKACC', 'FEEID', 'SWFEEID','FILEID','REFTXNUM','SYSORDERID','VSDORDERID','TLID','GRPID','SHORTNAME','AREAID',
// 'MBID','BRID','ID','AUTOID','YEARCD','ACCTREF','GRLLEVEL','BRTELE','RATE','ISINCODE','CAREBY','ACCTNO','TXNUM','NEWCARE','REACCTNO'] //la so nhung dang string
export const ArrSpecial = ['ORDERID', 'BANKCODE', 'CITYBANK', 'TAXNO', 'IDTYPE', 'ISSUERID',
    'FEEID', 'SWFEEID', 'FILEID', 'REFTXNUM', 'SYSORDERID', 'VSDORDERID', 'TLID', 'GRPID', 'SHORTNAME', 'AREAID',
    'MBID', 'BRID', 'ID', 'AUTOID', 'YEARCD', 'ACCTREF', 'GRLLEVEL', 'BRTELE', 'RATE', 'ISINCODE', 'CAREBY', 'ACCTNO', 'TXNUM', 'NEWCARE', 'REACCTNO', 'CONFIRMNO',
    'IDCODE', 'TAXNO', 'MOBILE', 'PHONE', 'COUNTRY', 'BANKACC', 'FAX', 'LRIDPLACE', 'LRPRIPHONE', 'REFPOSTID', 'DI ĐỘNG', 'SỐ TÀI KHOẢN TẠI NH', 'ĐĂNG KÝ SỞ HỮU', 'MÃ SỐ THUẾ',
    'SỐ HIỆU THAM CHIẾU', 'SỐ CHỨNG TỪ' ,'TRANSACTION NUMBER','REFERENCE ID','SALES','SỐ ĐIỆN THOẠI',
]
export const AllKeyLang = ['vie', 'en'] //all key ngon ngu trong vfm
export const PASSWORD_LENGTH = 8
export const ISCHECKSPECIALCHARACTER = true
export const maximumSize = 2000000
export const ArraySpecialImport = ['DELTD', 'STATUS', 'ERRMSG'] //nhung truong xuat hien sau khi import thanh cong

export function getAmountByExectype(type, amount, qtty) {
    return type == SRTYPE_NS ? amount : qtty;
}
export function getRowTextTable(lang) {
    if (lang == 'vie') return 'dòng'
    else return 'rows'
}
export function getPageTextTable(lang) {
    if (lang == 'vie') return 'Trang'
    else return 'Page'
}
// export function getObjname(){
//     return window.location.pathname.replace('/','');
// }

export function checkValidDate(text) {
    try {
        var comp = text.split('/');
        var m = parseInt(comp[1], 10);
        var d = parseInt(comp[0], 10);
        var y = parseInt(comp[2], 10);
        var date = new Date(y, m - 1, d);
        if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
            return true
        }
    } catch (error) {
        console.log('co loi checkValidDate')
    }
    return false
}

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
    return re.test(email)
}

export function saveLanguageKey(language) {
    localStorage.setItem(LANGUAGE_KEY, language)
}

export function getLanguageKey() {
    //console.log('localStorage.getItem(LANGUAGE_KEY)',localStorage.getItem(LANGUAGE_KEY))
    return localStorage.getItem(LANGUAGE_KEY)
}

let lang_vie = 'vie';
let lang_en = 'en';
export function getExtensionByLang(key, lang) {
    let ext = ''
    switch (lang) {
        case lang_en:
            ext = "_EN"
            break;

        default:
            break;
    }
    return key + ext;
}

export function isGreaterDay(inputDate1, inputDate2) {
    if (!!inputDate1 && !!inputDate2) {
        const in1 = inputDate1.substring(6, 10) + inputDate1.substring(3, 5) + inputDate1.substring(0, 2);
        const in2 = inputDate2.substring(6, 10) + inputDate2.substring(3, 5) + inputDate2.substring(0, 2);
        return in1 > in2;
    }
    return false
}
export function isEqualsDay(inputDate1, inputDate2) {
    if (!!inputDate1 && !!inputDate2) {
        const in1 = inputDate1.substring(6, 10) + inputDate1.substring(3, 5) + inputDate1.substring(0, 2);
        const in2 = inputDate2.substring(6, 10) + inputDate2.substring(3, 5) + inputDate2.substring(0, 2);
        return in1 == in2;
    }
    return false
}

export function checkStatusOfMaintainForm(status, pStatus) {
    return !(status=='A'||pStatus.indexOf('A')!=-1)
}