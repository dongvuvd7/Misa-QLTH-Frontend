<template>
    <div class="pagination">
        
        <div style="width: 10px"></div>
        <div class="pager">
            <!-- Button Trước -->
            <!-- Nếu page đang là 1 thì không quay lại Trước được -->
            <div
                class="page"
                :class="{ disable: page == 1 }"
                @click.prevent="$emit('onChangePage', 1)"
            >
                <!-- <i class="fa fa-angle-double-left" aria-hidden="true"></i> -->
                <div class="icon-toleft"></div>
            </div>
            <div
                class="page"
                :class="{ disable: page == 1 }"
                @click.prevent="$emit('onChangePage', page - 1)"
            >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
            </div>


            <!-- Hiển thị trang số 1 (trang đầu tiên) -->
            <!-- <div
                class="page"
                :class="{ active: page == 1 }"
                @click.prevent="$emit('onChangePage', 1)"
            >
                1
            </div> -->
            <!-- Nếu page hiện tại > 3 thì hiện thị ... phía trước, kiểu : 1 .... 4 .... 10 -->
            <!-- <div v-if="page > 3" class="page disable">...</div>

            <div
                v-for="p in pages"
                :key="p"
                class="page"
                :class="{ active: page == p }"
                @click.prevent="$emit('onChangePage', p)"
            >
                {{ p }}
            </div>

            <div v-if="page < totalPages - 3" class="page disable">...</div> -->
            
            <!-- Hiển thị trang cuối cùng -->
            <!-- <div
                v-if="totalPages > 1"
                class="page"
                :class="{ active: page == totalPages }"
                @click.prevent="$emit('onChangePage', totalPages)"
            >
                {{ totalPages }}
            </div> -->



                <input type="text" class="page active" style="width: 60px; text-align: center; border-radius: 4px;"
                    @change="changePage()"
                    readonly
                    v-model="page"
                >



            <!-- Button Sau -->
            <div
                class="page"
                :class="{ disable: page == totalPages }"
                @click.prevent="$emit('onChangePage', page + 1)"
            >
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
            <div
                class="page"
                :class="{ disable: page == totalPages }"
                @click.prevent="$emit('onChangePage', totalPages)"
            >
                <!-- <i class="fa fa-angle-double-right" aria-hidden="true"></i> -->
                <div class="icon-toright"></div>
            </div>

            <div class="page"> <b>{{page}}/{{totalPages}}</b> trang</div>

            <div style="width: 10px"></div>
      </div>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        perPage: {
            type: Number,
            default: 10,
        },
        page: {
            type: Number,
            default: 1,
        },
        totalPages: {
            typeof: Number,
            default: 0,
        }
    },
    computed: {
        pages: function(){
            let ps = [];
            let start = this.page > 3 ? this.page - 1 : 2;
            let end = this.page < this.totalPages - 3 ? this.page + 1 : this.totalPages - 1;
            for(let i = start; i <= end; i++) ps.push(i);
            console.log(ps);
            return ps;
        },
    },

    data() {
        return {
            thisPage: "",
        }
    },

    created() {
        this.thisPage = {...this.page};
    },

    methods: {

        changePage(){
            var intPage = parseInt(this.thisPage);
            this.$emit('onChangePage', this.page);
        },
    },

}
</script>

<style scoped>
.pagination{
    /* position: absolute; */
    /* bottom: 0;
    right: 48px; */
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    /* background-color: aqua; */
    justify-content: space-between;
}
.pager{
    display: flex;
    /* background-color: green; */
}
.page{
    padding: 4px;
    cursor: pointer;
    line-height: 20px;
    margin: 2px;
    outline: none;
    border: red;
}
.disable{
    color: #aaaaaa;
}
.active{

    margin-bottom: 1px;
    border: 1px solid #e0e0e0;    
    font-weight: bold;
    color: black;
    cursor: pointer;
}

.icon-toleft{
    width: 20px;
    height: 20px;
    background-image: url('../../assets/Icons/ic_MoveToFirst.png');
    background-position: center;
    background-size: contain;
}
.icon-toright{
    width: 20px;
    height: 20px;
    background-image: url('../../assets/Icons/ic_MoveToLast.png');
    background-position: center;
    background-size: contain;
}


</style>