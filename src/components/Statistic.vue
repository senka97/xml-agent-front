<template>
    <div align="center">
    <NavBar/>
    <br/>
    <h1 style="font-size:3em" align="Center">Statistics</h1>
    <br/>
     <b-card-group style="margin:20px" deck>
    <b-card  header-bg-variant="warning" :title="carTitle(kmDrivenCar.brand,kmDrivenCar.model)">
        <template bg-variant="warning" v-slot:header>
            <h2 class="mb-0">Most kilometers driven</h2>
            <br/>
            <h3>{{kmDrivenCar.kmDriven}} km</h3>
        </template> 
        <b-carousel style="width:300px; height:200px" ref="imageCarousel" v-model="currentImage" controls interval=100000>
            <b-carousel-slide style="width:300px; height:300px" v-for="img in kmDrivenCar.images" :key="img" :img-src="img">
            </b-carousel-slide>
        </b-carousel>
      <b-container style="font-size: 20px">
          <b-row>
              <b-col>
                  Class: 
              </b-col>
              <b-col>
                  {{kmDrivenCar.class}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Feul Type: 
              </b-col>
              <b-col>
                  {{kmDrivenCar.feulType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Gear Type: 
              </b-col>
              <b-col>
                  {{kmDrivenCar.gearType}}
              </b-col>
          </b-row>
            <b-row>
              <b-col>
                  Driven:
              </b-col>
              <b-col>
                  {{kmDrivenCar.kmDriven}} km
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Comments:
              </b-col>
              <b-col>
                  {{kmDrivenCar.numberofComments}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-icon icon="star-fill"></b-icon> 
              </b-col>
              <b-col>
                  {{kmDrivenCar.score}}
              </b-col>
          </b-row>
      </b-container>
    </b-card>

    <b-card  header-bg-variant="warning" :title="carTitle(mostCommentsCar.brand,mostCommentsCar.model)" img-top>
        <template v-slot:header>
            <h2 class="mb-0">Most comments</h2>
            <br/>
            <h3>{{mostCommentsCar.numberofComments}} comments</h3>
        </template>  
        <b-carousel style="width:300px; height:200px" ref="imageCarousel" v-model="currentImage" controls interval=100000>
            <b-carousel-slide v-for="img in mostCommentsCar.images" :key="img" :img-src="img">
            </b-carousel-slide>
        </b-carousel>
      <b-container style="font-size: 20px">
          <b-row>
              <b-col>
                  Class: 
              </b-col>
              <b-col>
                  {{mostCommentsCar.class}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Feul Type: 
              </b-col>
              <b-col>
                  {{mostCommentsCar.feulType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Gear Type: 
              </b-col>
              <b-col>
                  {{mostCommentsCar.gearType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Driven:
              </b-col>
              <b-col>
                  {{mostCommentsCar.kmDriven}} km
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Comments:
              </b-col>
              <b-col>
                  {{mostCommentsCar.numberofComments}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-icon icon="star-fill"></b-icon> 
              </b-col>
              <b-col>
                  {{mostCommentsCar.score}}
              </b-col>
          </b-row>
      </b-container>
    </b-card>

    <b-card  header-bg-variant="warning" :title="carTitle(bestScoreCar.brand,bestScoreCar.model)"  img-top>
    <template v-slot:header>
            <h2 class="mb-0">Best score</h2>
            <br/>
            <h3><b-icon icon="star-fill"></b-icon> {{bestScoreCar.score}}</h3>
        </template>  
       <b-carousel style="width:300px; height:200px" ref="imageCarousel" v-model="currentImage" controls interval=100000>
            <b-carousel-slide style="width:300px; height:200px" v-for="img in bestScoreCar.images" :key="img" :img-src="img">
            </b-carousel-slide>
        </b-carousel>
      <b-container style="font-size: 20px">
          <b-row>
              <b-col>
                  Class: 
              </b-col>
              <b-col>
                  {{bestScoreCar.class}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Feul Type: 
              </b-col>
              <b-col>
                  {{bestScoreCar.feulType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Gear Type: 
              </b-col>
              <b-col>
                  {{bestScoreCar.gearType}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Driven:
              </b-col>
              <b-col>
                  {{bestScoreCar.kmDriven}} km
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  Comments:
              </b-col>
              <b-col>
                  {{bestScoreCar.numberofComments}}
              </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-icon icon="star-fill"></b-icon> 
              </b-col>
              <b-col>
                  {{bestScoreCar.score}}
              </b-col>
          </b-row>
      </b-container>
    </b-card>
  </b-card-group>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
export default {
    name: 'Statistic',
    components: {
        NavBar
    },
    data(){
        return{
            kmDrivenCar:{
                images:['https://autorepublika.com/wp-content/uploads/2019/07/BMW-X6.jpg'],
                brand:"BMW",
                model:"x6",
                class:'Class',
                feulType:'Diesel',
                gearType:'Automatic',
                seatsChildren:0,
                kmDriven:100000,
                numberofComments:0,
                score:4
             },
             mostCommentsCar:{
                images:['https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Yugo_Koral_in_Serbia.jpg/369px-Yugo_Koral_in_Serbia.jpg'],
                brand:"Yugo",
                model:"45",
                class:'Class',
                feulType:'Diesel',
                gearType:'Automatic',
                seatsChildren:0,
                kmDriven:20000, 
                numberofComments:50,
                score:3.6
             },
             bestScoreCar:{
                images:['https://images3.polovniautomobili.tv/user-images/thumbs/1358/13586411/1e33091352d0-800x600.jpg'],
                brand:"Skoda",
                model:"Fabia",
                class:'Class',
                feulType:'Diesel',
                gearType:'Automatic',
                seatsChildren:0,
                kmDriven:50000,
                numberofComments:10,
                score:5
             }
        }
    },
    methods:{
        carTitle(brand,model){
            return brand+" "+model
        }
    }
}
</script>