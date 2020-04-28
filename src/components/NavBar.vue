<template>
   <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
    <b-navbar-brand class="title font-weight-bold">Rent-a-Car Agent</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">

            <!--Za ulogovane korisnike-->
           <!--  <b-nav-item href="/cart">Cart</b-nav-item> -->

            <!--Za neregistrovane korisnike-->
            <b-button class="mr-3"><a href="/login" class="removeDecoration">Sign in</a></b-button>
            <b-button><a href="/registration" class="removeDecoration">Sign up</a></b-button>

            <!--Za sve ulogovane korisnike-->
         <!--   <b-button @click="logout">Log out</b-button>  -->
        </b-navbar-nav>
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
</style>