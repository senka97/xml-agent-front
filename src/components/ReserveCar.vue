<template>
    <div>
        <NavBar/>
        <b-card no-body class="overflow-hidden shadow mb-4 mt-4 ml-4 mr-4" header-bg-variant="warning">
          <template v-slot:header>
            <h2 class="sm-0 text-center"> {{item.brand}}  {{item.model}} </h2>
          </template>
        </b-card>
        <div>
          <b-row class="px-3">
            <b-col class="mx-2">
              <b-card-img :src="item.image" alt="Image" class="rounded-0 "></b-card-img>
            </b-col>
            <b-col class="mx-2">
              <b-card-body>
                <b-card-text>
                <b-form @submit.prevent="reserve">
                  <b-row class="mt-0">
                    <b-col>
                        <b> Available from: </b> {{item.startDate}} <b> to </b> {{item.endDate}}
                    </b-col>
                    <b-col>
                        <b>Collision Damage Waiver:</b> Yes
                    </b-col>
                  </b-row>
                  <b-row class="mt-3"> 
                    <b-col col-3>
                      <b> Rating:  </b> {{item.rate}}
                      <b-icon icon="star-fill"></b-icon> 
                    </b-col>
                    <b-col>
                        <b>Price:</b> {{item.price}} <b>€</b>
                    </b-col>
                    <b-col>
                        <b>Children seats:</b> {{item.childrenSeats}}
                    </b-col>
                  </b-row>   
                  <b-row class="mt-3">
                    <b-col>
                        <b>Fuel type:</b> {{item.fuelType}}
                    </b-col>
                    <b-col>
                        <b>Vehicle type:</b> {{item.vehicletype}}
                    </b-col>
                    <b-col>
                        <b>Transmission:</b> {{item.transmission}}
                    </b-col>
                  </b-row>                        
                  <b-row class="mt-3">
                    <b-col>
                        <b>Mileage:</b> {{item.mileage}} <b>km</b>
                    </b-col>
                    <b-col>
                        <b>Km limit:</b> {{item.kilometerLimit}}
                    </b-col>
                    <b-col>
                        <b>Location:</b> {{item.location}} 
                    </b-col>
                  </b-row>  
                  
                               
                  <b-row class="mt-5">
                    <b-col>                     
                        <b-row class="text-center" >
                          <b-col>
                            <h3> <b> User information </b> </h3>
                          </b-col>
                        </b-row>
                        
                        <b-row >
                          <b-col>
                          <b-form-group  align="left" label="Name:" label-for="name">
                            <b-form-input class="col-12" id="name" v-model="name" type="text" required placeholder="Enter name"></b-form-input>
                          </b-form-group>
                          </b-col>
                          <b-col>
                          <b-form-group  align="left" label="Last name:" label-for="userLastname">
                            <b-form-input class="col-12" id="userLastname" v-model="userLastname" type="text" required placeholder="Enter lastname"></b-form-input>
                          </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row >
                          <b-col>
                          <b-form-group  align="left" label="Email:" label-for="email">
                            <b-form-input class="col-12" id="email" v-model="email" type="email" required placeholder="Enter email"></b-form-input>
                          </b-form-group>
                          </b-col>
                          <b-col>
                          <b-form-group  align="left" label="Phone number:" label-for="phoneNumber">
                            <b-form-input class="col-12" id="phoneNumber" v-model="phoneNumber" type="number" required placeholder="Enter phone number"></b-form-input>
                          </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row >
                          <b-col>
                            <b-form-group  align="left" label="Start date:" label-for="startDate">
                              <b-form-datepicker :min="minDate" v-model="startDate" locale="en" placeholder="Start date"></b-form-datepicker>
                            </b-form-group>         
                          </b-col>
                          <b-col>
                            <b-form-group  align="left" label="End date:" label-for="endDate" > 
                              <b-form-datepicker :min="minDate" :max="maxDate" v-model="endDate" locale="en" placeholder="End date"></b-form-datepicker>
                            </b-form-group>
                          </b-col>
                        </b-row>                    
                    </b-col>
                  </b-row>
                  <hr>
                  <b-row>       
                    <b-button type="submit" :disabled="!formIsValid" class=" ml-auto mr-3 mb-0" title=" You need to select date" >Reserve</b-button>
                  </b-row>
                  </b-form> 
                </b-card-text>       
              </b-card-body>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-6"> 
              <b-card id="comments-card" v-b-toggle.collapse-1  no-body class="overflow-hidden shadow mb-4  ml-4 mr-4" header-bg-variant="warning">
                <template v-slot:header>
                  <h2 class="sm-0 text-center">Show Comments </h2>
                </template>
              </b-card>
              <b-collapse id="collapse-1" class="mx-4 my-2">
            <b-card >
                <div v-for="comment in comments" :key="comment.id"> 
                  <b-form-group  align="left" :label="comment.user" label-for="comment">
                    <b-form-textarea id="comment"  type="text" disabled :placeholder="comment.text"></b-form-textarea>
                  </b-form-group>       
                 <!-- <b-form-group :v-show="!comment.isReplayed">
                    <b-form-textarea class="mx-4 my-2"  placeholder="Replay"> </b-form-textarea>
                  </b-form-group>  -->                                             
                </div>
            </b-card>
            
              </b-collapse>
            </b-col>
          </b-row>
        </div>
    </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
    name: 'ReserveCar',
    components: {
        NavBar
    },
    data() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const minD = new Date(today);
      return {      
        item:
        {
          id: 1,
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-audi-a8-mmp-1-1573063953.jpeg?crop=0.704xw:1.00xh;0.208xw,0&resize=640:*",
          brand: "Audi",
          model: "A8",
          price: 75,
          fuelType: "Disel",
          vehicletype: "Saloon",
          transmission: "Manual",
          mileage: 15000,
          kilometerLimit: "Unlimited",
          childrenSeats: 0,
          cdw: true,
          rate: 4.5,
          location: "Novi Sad",
          startDate: "05.05.2020.",
          endDate: "05.05.2021."
        },
        comments: [
            {
                id: "1",
                user: "User1",
                text: "This car sucks!!!!!",
                isReplayed: true
            },
            {
                id: "2",
                user: "User2",
                text: "The best car ever",
                isReplayed: false
            }
        ],
        name: "",
        userLastname: "",
        email: "",
        phoneNumber: null,
        startDate: null,
        endDate: null,
        minDate: minD,
        maxDate: null,
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
      reserve() {
          
      }
    },
    computed:{
      formIsValid: function()
      {
          if(this.startDate!=null && this.endDate!=null  && this.startDate <= this.endDate)
          {
            return true;
          }
          else return false;
      }
    }

}
</script>

<style scoped>

#comments-card{
    cursor: grab;
}

</style>