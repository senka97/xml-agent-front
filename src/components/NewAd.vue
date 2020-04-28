<template>
    
    <div align="center">
    <br><br><br>
    <b-card
        style="max-width: 70rem; "
        border-variant="secondary"
      
    >
        
        <template v-slot:header>
            <h1 class="mb-0">Place an Ad</h1>
        </template>
        <b-container>
            <b-row>
                <b-col md="2">
                <b-container>
                    <b-row>
                        <input @change="getImage" type="file" ref="file" style="display: none">
                        <b-img v-if="images.length==0" src="https://via.placeholder.com/200"/>
                        <b-carousel ref="imageCarousel" v-model="currentImage" controls interval=100000>
                            <b-carousel-slide v-for="img in images" :key="img" :img-src="img" style="width:200px; height:200px">
                            </b-carousel-slide>
                        </b-carousel>
                        <b-button-group class="mt-3">
                            <b-button style="width:100px; height:50px" size="sm" @click="$refs.file.click()" >Add an image</b-button>
                            <b-button style="width:100px; height:50px" size="sm" @click="removeImage()" variant="dark" >Remove image</b-button>
                        </b-button-group>
                    </b-row>
                </b-container>
                </b-col>
                <b-col>
                    <b-container>
                        <b-row>
                            <b-col>
                            <h3><u>Main info</u></h3>
                            <br>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label-cols="1" label-cols-lg="3" label-size="sm" label="Brand:" >
                                <b-form-input label-cols="1" size="sm" v-model="ad.brand"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols="1" label-cols-lg="3" label-size="sm" label="Model:" >
                                <b-form-input label-cols="1" size="sm" v-model="ad.model"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols-lg="3" label-size="sm" label="Class:" >
                                    <b-form-select v-model="ad.class" :options="classes" size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <h3><u>Technical info</u></h3>
                            <br>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label-cols-lg="5" label-size="sm"  label="Feul type:" >
                                    <b-form-select v-model="ad.feulType" :options="feulTypes" size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols-lg="5" label-size="sm" label="Gear type:" >
                                 <b-form-select v-model="ad.gearType" :options="gearTypes" size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols-lg="3" label-size="sm" label="Seats for children:" >
                                <b-form-input type="number" min="0" size="sm" placeholder="Number of seats" v-model="ad.seatsChildren"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                         <b-row>
                            <b-col>
                                 <b-form-group  label-cols-lg="5" label-size="sm" label="Kilometers driven:" >
                                     <b-input-group size="sm" append="km">
                                        <b-form-input type="number" min="0" size="sm" placeholder="Number of kilometers" v-model="ad.kmDriven"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-checkbox 
                                    v-model="ad.colision"
                                    size="2sm"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                    >Collision Damage Waiver
                                </b-form-checkbox>
                                
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <h3><u>Rental info</u></h3>
                            <br>
                            </b-col>
                        </b-row>
                        <b-row>
                        <b-col>
                            <b-form-group label-cols-lg="5" label-size="sm"  label="Rentable from:" >
                            <b-form-datepicker size="sm" :min="minDate" locale="en" placeholder="Start date"  v-model="ad.minDate"></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label-cols-lg="5" label-size="sm" label="to:" >
                            <b-form-datepicker size="sm" :min="minDate" locale="en" placeholder="End date" v-model="ad.maxDate"></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                        </b-row>
                          <b-row>
                            <b-col>
                                <b-form-group  label-cols-lg="5" label-size="sm"  label="Price from:" >
                                     <b-input-group size="sm" append="€">
                                        <b-form-input type="number" min="0" size="sm" placeholder="Minimal price" v-model="ad.minPrice"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                 <b-form-group  label-cols-lg="5" label-size="sm"  label="to:" >
                                     <b-input-group size="sm" append="€">
                                        <b-form-input type="number" min="0" size="sm" placeholder="Maximum price" v-model="ad.maxPrice"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            </b-col>
                            <b-col md="6">
                                <b-form-checkbox 
                                    id="checkbox-1"
                                    v-model="ad.androidApp"
                                    name="checkbox-1"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                    >Android app present in the vehicle
                                </b-form-checkbox>
                               
                            </b-col>
                             <b-col>
                            </b-col>
                        </b-row>
                        <b-row>
                            <br/>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button size="lg">
                                    Submit
                                </b-button>
                            </b-col>
                        </b-row>
                     </b-container>
                </b-col>
            </b-row>
        </b-container>        
    </b-card>
    </div>
</template>

<script>


export default {
    name: 'NewAd',
    data(){
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const minD = new Date(today);
        return{
             minDate: minD,
             selectedGear: null,
             selectedFeul: null,
             selectedClass: null,
             gearTypes:[
                { value: null, text: 'Choose the gear' },
                { value: 'Manual', text: 'Manual' },
                { value: 'Automatic', text: 'Automatic' },
                { value: 'Semi-automatic', text: 'Semi-automatic' },
                { value: 'CVT', text: 'CVT' }
             ],
             feulTypes:[
                 { value: null, text: 'Choose the feul' },
                 { value: 'Gasoline', text: 'Gasoline' },
                 { value: 'Diesel', text: 'Diesel' },
                 { value: 'Hybridm', text: 'Hybrid' },
                 { value: 'Petrol', text: 'Petrol' },
                 { value: 'Electric', text: 'Electric' },
             ],
             classes: [
                { value: null, text: 'Choose the class' },
                 { value: 'Microcar', text: 'Microcar' },
                 { value: 'City car', text: 'City car' },
                 { value: 'Supermini', text: 'Supermini' },
                 { value: 'Small family', text: 'Small family' },
                 { value: 'Large family', text: 'Large family' },
                 { value: 'Executive', text: 'Executive' },
                 { value: 'Luxury saloon', text: 'Luxury saloon' }
             ],
             image: "https://via.placeholder.com/200",
             images:[],
             currentImage:0,
             ad:{
                brand:"",
                model:"",
                class:null,
                feulType:null,
                gearType:null,
                seatsChildren:0,
                kmDriven:0,
                colision:"not_accepted",
                minDate:null,
                maxDate:null,
                minPrice:null,
                maxPrice:null,
                androidApp:"not_accepted"
             }
             
        }
    },
    methods:{
        getImage(e){
            let image = e.target.files[0];
            let reader = new FileReader();
            image.width='200px';
            image.height="200px";
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.image= e.target.result
                this.images.push(this.image)
            }
            reader.onloadend = () => this.changeToLastSlide();
            
        },
        changeToLastSlide(){
            console.log(this.images.length-1)
            this.currentImage=this.images.length-1;
            this.$refs.imageCarousel.setSlide(this.images.length-1);
        },
        removeImage(){
            this.images.splice(this.currentImage,1);
            this.currentImage=this.currentImage-1;
        }
        
    }
}
</script>

<style>
.image {
    cursor: pointer;
}
</style>