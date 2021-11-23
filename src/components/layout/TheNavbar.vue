<template>
    <div id="navBar">
        
        <div id="Navbar_logo_box">     
            <a href="http://localhost:8080/#/teacher"><div id="logo"></div></a>
            Thiết bị
            <div id="sidebar"></div>
        </div>
        <div id="Navbar_content_box">
            <router-link class="navbar-item" tag="li" to="/generaltest" >
                <div class="navbar-icon icon-1"></div>
                <div class="navbar-text">Tổng quan</div>
            </router-link>
            <div class="navbar-item">
                <div class="navbar-icon icon-5"></div>
                <div class="navbar-text">Thiết bị</div>
            </div>
            <div class="navbar-item">
                <div class="navbar-icon icon-6"></div>
                <div class="navbar-text">Mượn trả</div>
            </div>
            <div class="navbar-item">
                <div class="navbar-icon icon-7"></div>
                <div class="navbar-text">Báo cáo</div>
            </div>
            <router-link class="navbar-item" tag="li" to="/teacher" >
                <div class="navbar-icon icon-8"></div>
                <div class="navbar-text">Hệ thống</div>
            </router-link>

        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    @import url('../../styles/layout/navbar.css');

</style>