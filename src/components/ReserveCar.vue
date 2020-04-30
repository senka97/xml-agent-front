<template>
  <NavBar/>

</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
    name: 'ReserveCar',
    components: {
        NavBar
    },
    data() {
        return {
           car: {}
        }
    },
    methods: {
     created() {
       /* var id = this.$route.fullPath;
        id = id.split('?')[1];
        id = id.split('=')[1];
        axios.get(baseUrl + "/"+id).then(
            response=> {
                this.car = response.car;
            }
        )*/
              
    },
    }

}
</script>

<style scoped>

</style>