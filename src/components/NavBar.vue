<template>
   <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
    <b-navbar-brand class="title font-weight-bold">Rent-a-Car Agent</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="/" link-classes="text-light"><b>Search</b></b-nav-item>
              <b-nav-item href="/newAd" link-classes="text-light"><b>Post Ad</b></b-nav-item>
              <b-nav-item href="/statistic" link-classes="text-light"><b>Statistics</b></b-nav-item>
            </b-navbar-nav>
      
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
            <!--Za ulogovane korisnike-->
           <!--  <b-nav-item href="/cart">Cart</b-nav-item> -->

            <!--Za neregistrovane korisnike-->
            <b-nav-item href="/login" link-classes="text-light"><b>Sign in</b></b-nav-item>
            <b-nav-item href="/registration" link-classes="text-light"><b>Sign up</b></b-nav-item>
            

            <!--Za sve ulogovane korisnike-->
         <!--   <b-button @click="logout">Log out</b-button>  -->
        </b-navbar-nav>
      </b-collapse>
    </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
           
        }
    },
    methods: {
     //   logout: function() { }
    }

}
</script>

<style scoped>
.removeDecoration {
    text-decoration: none;
    color: #fff;
}
.router-link-active{ color: white;}
</style>