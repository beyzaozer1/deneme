import moment from "moment";
import Swal from 'sweetalert2/src/sweetalert2.js'
import _ from "lodash";

export default {
    data() {
        return {
            loaderLoading: false,
        }
    },
    computed: {
        profileSurveyQuestionIds() {
            return [
                {
                    code: '1',
                    questions: [12, 15, 16, 340]
                },
                {
                    code: '2',
                    questions: [29, 36, 46, 48, 168, 186, 187, 188, 208, 341]
                },
                {
                    code: '3',
                    questions: [59, 58]
                },
                {
                    code: '4',
                    questions: [73, 171, 75, 77, 150, 175, 230, 176, 177, 329, 174]
                },
                {
                    code: '5',
                    questions: [335, 336, 337, 338]
                },
                {
                    code: '6',
                    questions: [135, 136]
                },
                {
                    code: '7',
                    questions: [141]
                },
                {
                    code: '8',
                    questions: [331, 332, 333, 334]
                },
                {
                    code: '9',
                    questions: [200, 201]
                },
                {
                    code: '10',
                    questions: [204, 250]
                },
                {
                    code: '12',
                    questions: [344, 345, 346]
                },
            ]
        },
        cdnImagePrefix() {
            return process.env.VUE_APP_CDN;
        },
        defaultImage() {
            return process.env.VUE_APP_MEDIA_URL + '/images/images/napolyon-avatar.jpg';
        },
        notificationImage() {
            return process.env.VUE_APP_MEDIA_URL + '/images/notification.jpg';
        },
        defaultAvatar() {
            return this.mediaBase + '/images/avatars/Avatar0.png'
        },
        days() {
            let results = [];
            for (let i = 1; i < 32; i++) {
                results.push({
                    text: i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}),
                    value: i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
                });
            }
            return results;
        },
        months() {
            let results = [];
            for (let i = 1; i <= 12; i++) {
                results.push({
                    text: i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}),
                    value: i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
                });
            }
            return results;
        },
        years() {
            let results = [];
            let year = moment().format('YYYY');
            for (let i = Number(year) - 100; i < Number(year) - 14; i++) {
                results.push({text: i, value: i});
            }
            return results;
        },
    },
    methods: {
        convertToKebabCase(value) {
            return _.kebabCase(value);
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        urlParser(url) {
            let getVars = {};
            let uri = url.split('?');
            if (uri.length == 2) {
                let vars = uri[1].split('&');
                let tmp = '';
                vars.forEach(function (v) {
                    tmp = v.split('=');
                    if (tmp.length == 2)
                        getVars[tmp[0]] = tmp[1];
                });
            }
            return getVars;
        },
        getErrorMessage(message) {
            let error = '';
            let title = '';

            if (Array.isArray(message)) {
                error += `<ul>`;
                for (let i = 0; i < message.length; i++) {
                    error += `<li>${this.$t(message[i])}</li>`;
                }
                error += `</ul>`;
            } else if (typeof message === 'object') {
                if (message.hasOwnProperty('response')) {
                    error = message.response.data.content;
                    title = message.response.data.title;
                } else {
                    let valueHas = false;
                    error += `<ul>`;
                    for (let key in message) {
                        valueHas = true;
                        let currentValue = message[key];
                        error += `<li><b>${this.$t(key)} : </b> ${this.$t(currentValue)}</li>`;
                    }
                    error += `</ul>`;

                    if (!valueHas) {
                        error = null;
                    }
                }
            } else if (typeof message === 'string') {
                error = this.$t(message);
            } else {
                error = this.$t('errors.general');
            }

            if (!error) {
                error = this.$t('errors.general');
            }

            return error;
        },
        formatNumber(number) {
            return new Intl.NumberFormat().format(number);
        },
        tcCheck(value) {
            let single = 0,
                even = 0,
                result = 0,
                TCSum = 0;

            if (value.length != 11)
                return false;
            if (isNaN(value)) return false;

            if (value[0] == 0) return false;

            single = parseInt(value[0]) + parseInt(value[2]) + parseInt(value[4]) + parseInt(value[6]) + parseInt(value[8]);
            even = parseInt(value[1]) + parseInt(value[3]) + parseInt(value[5]) + parseInt(value[7]);

            single = single * 7;
            result = Math.abs(single - even);
            if (result % 10 != value[9]) return false;

            for (var i = 0; i < 10; i++) {
                TCSum += parseInt(value[i]);
            }

            if (TCSum % 10 != value[10]) return false;

            return true;
        },
        scrollToTop(x = 0, y = 0) {
            window.scrollTo(x, y);
        },
        closeModalByName(name) {
            this.$modal.hide(name);
        },
        openModalByName(name) {
            this.$modal.show(name);
        },
        showSuccessNotification(title = 'Tebrikler!', text = 'İşlem Başarılı') {
            Swal.fire({
                title: title,
                text: text,
                icon: 'success',
                confirmButtonText: 'Tamam'
            });
        },
        showErrorNotification(title = "Hata oluştu!", error) {
            let errorText = error || 'İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz!'
            Swal.fire({
                title: title,
                html: errorText,
                icon: 'error',
                confirmButtonText: 'Tamam'
            });
        },
        capitalize(string) {
            let pieces = string.split(' '), result = '';
            for (let i = 0; i < pieces.length; i++) {
                result += pieces[i].charAt(0).toUpperCase() + pieces[i].slice(1).toLowerCase();
                if ((pieces.length - 1) !== i) {
                    result += ' ';
                }
            }
            return result;
        },
        convertArrayToObjectByKey(array, key) {
            let result = {};
            try {
                for (let i = 0; i < array.length; i++) {
                    result[array[i][key]] = array[i];
                }
                return result;
            } catch (e) {
                console.log(e);
                return {};
            }
        },
        openInNewTab(url) {
            window.open(url, '_blank');
        }
    }
};
