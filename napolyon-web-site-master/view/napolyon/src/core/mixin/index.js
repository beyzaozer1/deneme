import Swal from 'sweetalert2/src/sweetalert2.js'
import hook from '@/core/mixin/hook.mixin';
import general from '@/core/mixin/general.mixin';

function createMixin(mixinList) {
    let mixinKeys = [];
    let mixins = {};
    for(let i = 0; i < mixinList.length; i++){
        mixinKeys.push(...Object.keys(mixinList[i]));
    }
    mixinKeys = [...new Set(mixinKeys)];
    for(let i = 0; i < mixinList.length; i++)
    {
        for(let j = 0; j < mixinKeys.length; j++){
            if(mixinKeys[j] === 'data'){
                if(!(mixinKeys[j] in mixins)){
                    mixins[mixinKeys[j]] = mixinList[i][mixinKeys[j]];
                }
            }else{
                if(mixinKeys[j] in mixinList[i]){
                    if(!(mixinKeys[j] in mixins)){
                        mixins[mixinKeys[j]] = {};
                    }
                    mixins[mixinKeys[j]] = {...mixins[mixinKeys[j]], ...mixinList[i][mixinKeys[j]]};
                }
            }

        }
    }
    return mixins;
}

export default {
    ...createMixin([
        hook,
        Swal,
        general
    ])
};

