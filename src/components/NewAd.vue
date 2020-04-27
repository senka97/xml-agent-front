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
                        <b-img @change="onFileChange()"  @click="$refs.file.click()" class="image"  style="width:200px; height:200px" :src="image"></b-img>
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
                                <b-form-input label-cols="1" size="sm" v-model="model"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols="1" label-cols-lg="3" label-size="sm" label="Model:" >
                                <b-form-input label-cols="1" size="sm" v-model="model"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols-lg="3" label-size="sm" label="Class:" >
                                    <b-form-select v-model="selectedClass" :options="classes" size="sm"></b-form-select>
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
                                    <b-form-select v-model="selectedFeul" :options="feulTypes" size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols-lg="5" label-size="sm" label="Gear type:" >
                                 <b-form-select v-model="selectedGear" :options="gearTypes" size="sm"></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols-lg="3" label-size="sm" label="Seats for children:" >
                                <b-form-input type="number" min="0" size="sm" placeholder="Number of seats"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                         <b-row>
                            <b-col>
                                 <b-form-group  label-cols-lg="5" label-size="sm" label="Kilometers driven:" >
                                     <b-input-group size="sm" append="km">
                                        <b-form-input type="number" min="0" size="sm" placeholder="Number of kilometers"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-checkbox 
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
                            <b-form-datepicker size="sm" :min="minDate" locale="en" placeholder="Start date"></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label-cols-lg="5" label-size="sm" label="to:" >
                            <b-form-datepicker size="sm" :min="minDate" locale="en" placeholder="End date"></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                        </b-row>
                          <b-row>
                            <b-col>
                                <b-form-group  label-cols-lg="5" label-size="sm"  label="Price from:" >
                                     <b-input-group size="sm" append="€">
                                        <b-form-input type="number" min="0" size="sm" placeholder="Minimal price"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                 <b-form-group  label-cols-lg="5" label-size="sm"  label="to:" >
                                     <b-input-group size="sm" append="€">
                                        <b-form-input type="number" min="0" size="sm" placeholder="Maximum price"></b-form-input>
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
                                    v-model="status"
                                    name="checkbox-1"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                    >Android app present in the vehicle
                                </b-form-checkbox>
                               
                            </b-col>
                             <b-col>
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
                 { value: 'Liquified Petroleum', text: 'Liquified Petroleum' },
                 { value: 'Compressed Natural Gas', text: 'Compressed Natural Gas' },
                 { value: 'Etahnol', text: 'Etahnol' },
                 { value: 'Bio-diesel', text: 'Bio-diesel' }
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
             image: "https://via.placeholder.com/200"
             
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
            }
        }
    }
}
</script>

<style>
.image {
    cursor: pointer;
}
</style>