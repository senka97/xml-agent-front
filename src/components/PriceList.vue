<template>
  <div>
      <NavBar/>
      <b-card no-body class="overflow-hidden shadow mb-1 mt-3 mx-5" header-bg-variant="warning">
          <template v-slot:header>
            <h2 class="sm-0 text-center"> Manage Your Price Lists </h2>
          </template>
      </b-card>
      <div class="mx-5 my-4">
        <b-tabs content-class="mt-3" >
          <b-tab title="My Price Lists" active :title-link-class="linkClass()">
            <div class="container">
              <b-table striped outlined hover fixed head-variant="dark" :items="items" :fields="fields">
                <template v-slot:cell(delete)="row">
                  <b-button size="sm" variant="outline-danger" @click="deletePriceList(row.item.id)"> Delete Price List </b-button>
                </template>
              </b-table>
            </div>

          </b-tab>
          <b-tab title="New Price List" :title-link-class="linkClass()">
             
            <div class="text-center">
              <h3 class="dark-grey-text">
                <strong>Make New Price List</strong>
              </h3>
            </div>
            <div class="container" style="width:30em">    
              <b-form class="my-3" @submit.prevent="createPriceList()">   
                <b-form-group label="Alias:" >
                    <b-input-group  >
                        <b-form-input required  type="text" v-model="alias" placeholder="Price List"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <b-form-group label="Price per km:" >
                    <b-input-group  append="€">
                        <b-form-input required  type="number" :min="0" v-model="pricePerKm" placeholder="0"></b-form-input>
                    </b-input-group>
                </b-form-group>
                      
                <b-form-group  label="Price per day:" >
                    <b-input-group  append="€">
                        <b-form-input required  type="number" :min="0" v-model="pricePerDay" placeholder="0"></b-form-input>
                    </b-input-group>
                </b-form-group>
                           
                <b-form-group  label="Discount 20 days:" >
                    <b-input-group  append="%">
                        <b-form-input required  type="number" :min="0" v-model="discount20Days" placeholder="0"></b-form-input>
                    </b-input-group>
                </b-form-group>
                        
                <b-form-group label="Discount 30 days:" >
                    <b-input-group  append="%">
                        <b-form-input required  type="number" :min="0" v-model="discount30Days" placeholder="0"></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-row>
                    <b-button type="submit" class="mx-auto" style="width:15em">Create</b-button> 
                </b-row>       
              </b-form>
                
            </div>

              
          </b-tab>
        </b-tabs>
</div>
  </div>
</template>

<script>

import NavBar from "../components/NavBar.vue";
import axios from "axios";

const baseUrl = "http://localhost:8080/api";

export default {
    name: 'PriceList',
    components: {
        NavBar
    },
    data(){
        return {
           fields: [
            "alias",
            "pricePerDay",
            "pricePerKm",
            "discount20Days",
            "discount30Days",
            "delete"
          ],
          items: [],
          pricePerDay: null,
          pricePerKm: null,
          discount20Days: null,
          discount30Days: null,
          alias: "",
        }
    },
     methods: {

      linkClass() {
        return ['bg-secondary', 'text-light']
      },

      deletePriceList(id){ 
          axios.delete(baseUrl + "/priceLists/"+id).then(
              () => {
                this.$bvToast.toast('Price List Deleted ', {
                    title: 'Success',
                    variant: 'success',
                    solid: true
                });   
                this.getPriceLists();                    
          })
        .catch(error => {
          if (error.response) {
              this.$bvToast.toast(error.response.data, {
                title: 'Can\'t be deleted ',
                variant: 'danger',
                solid: true
                });
          }       
          });
      },

      getPriceLists()
      { 
        axios.get(baseUrl + "/priceLists").then(response => {
            this.items = response.data;
        });
      },
      
      createPriceList()
      {
          axios.post(baseUrl+'/priceLists',{
                alias: this.alias,
                pricePerDay: this.pricePerDay,
                pricePerKm: this.pricePerKm,
                discount20Days: this.discount20Days,
                discount30Days:this.discount30Days,
            })
           .then(() => {
                this.$bvToast.toast('New Price List Created ', {
                    title: 'Success',
                    variant: 'success',
                    solid: true
                }); 
                this.refreshForm();   
                this.getPriceLists();                    
          })
          .catch(error => {
          if (error.response) {
              this.$bvToast.toast("Price list alias already exists", {
                title: 'Bad Request',
                variant: 'danger',
                solid: true
                });
          }       
          });
      },
      refreshForm()
      {
        this.alias = "";
        this.pricePerDay= null;
        this.pricePerKm= null;
        this.discount20Days = null;
        this.discount30Days= null;       
      },
      

    },
    created()
    {    
       this.getPriceLists();
    },
}
</script>

<style scoped>

.container{
    margin-left: auto;
    margin-right: auto;
}

</style>