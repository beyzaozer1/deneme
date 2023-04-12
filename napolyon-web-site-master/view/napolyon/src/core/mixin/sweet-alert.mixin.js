import Vue from 'vue';
import i18n from "@/core/plugins/vue-i18n";

export default {
    methods: {
        clickMe() {
            alert("Clicked")
        }
    },
    watch: {
        loading(newValue, oldValue) {
            if (newValue === true) {
                Vue.swal.fire({
                    icon: 'info',
                    title: i18n.tc("loading"),
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    onBeforeOpen: () => {
                        this.$swal.showLoading();
                    },
                });
            } else {
                setTimeout(() => this.$swal.close(), 500);
            }
        }
    }
}