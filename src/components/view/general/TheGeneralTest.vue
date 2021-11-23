<template>
    <div data-app>
        <h1 class="Title">Tổng quan test</h1>
        <div class="ccb">
           <v-combobox
          v-model="select"
          :items="items"
          label="Combobox"
          multiple
          outlined
          dense
          clearable
          small-chips
          solo

        ></v-combobox>
        </div>

        <table style="height: 600px;">
            <tbody>
                <tr>Dong 1</tr>
            </tbody>
        </table>
    </div>

    

</template>

<script>
export default {
    data() {
        return {
            select: ['Vuetify', 'Programming','JS'],
            items: [
            'Programming',
            'Design',
            'Vue',
            'Vuetify',
            'JS',
            'HTML',
            'CSS'
            ],
      }
    },
}
</script>

<style scoped>
    .Title{
        position: absolute;
        top: 48px;
        left: 178px;
        box-sizing: border-box;
        display: inline-block;
        background: rgb(244, 245, 246);
        width: calc(100% - 178px);
        height: calc(100% - 48px);
        padding-top: 24px;
        padding-left: 24px;
        padding-bottom: 24px;
        padding-right: 24px;
    }
    .ccb{
        position: absolute;
        top: 108px;
        left: 278px;
    }
</style>