<template>
    <div class="TableComponent">
      <v-table class="table-component-table">
        <thead class="table-component-table-nav">
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th>Phone</th>
            <th>Email</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody v-if="!loading">
            <RowComponent 
                v-for="address in addresses" 
                :key="address.email" 
                :address="address"
                :handleDelete="handleDelete"
                :handleEdit="handleEdit"
                :errors="errors"
                :resetErrors="resetErrors"
            />
            <AddRowComponent
                :handleAdd="postAddressHandler"
                :errors="errors"
                :addresses="addresses"
                :isEditing="isEditing"
            />
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="5" class="text-center">
                    Loading...
                </td>
            </tr>
        </tbody>
      </v-table>
    </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
import AddRowComponent from './AddRowComponent.vue'
import RowComponent from './RowComponent.vue'
import { 
    getAddress, 
    putAddress,
    deleteAddress, 
    postAddress 
} from '../services/addressService';

export default {
    name: 'TableComponent',
    components: {
        RowComponent,
        AddRowComponent
    },
    data() {
        return {
            errors: {
                name: '',
                lastname: '',
                phone: '',
                email: ''
            },
            addresses: null,
            loading: true,
            isEditing: false
        }
    },
    methods: {
        async getAddressHandler() {
            try {
                this.addresses = await getAddress()
                this.loading = false
            } catch (error) {
                console.error(error)
            }
        },
        async postAddressHandler(address) {
            if(this.validateAll(address)) {
                try {
                    await postAddress(address)
                    this.addresses = [...this.addresses, address]
                } catch (error) {
                    console.error(error)
                }
            }
        },
        validateEmail(email) {
            return String(email)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
        async handleDelete(id) {
            try {
                await deleteAddress(id)
                this.addresses = this.addresses.filter(address => address.id !== id)
            } catch (error) {
                console.error(error)
            }
        },
        validateAll(address) {
            let adressessToValidate = this.addresses

            if(this.addresses.find(addressToFind => addressToFind.id === address.id)) {
                adressessToValidate = adressessToValidate.filter(addressToFind => addressToFind.id !== address.id)
                this.isEditing = true
            } else {
                this.isEditing = false
            }

            if(address.name === '') {
                this.errors.name = 'Name is required'
            } else {
                this.errors.name = ''
            }

            if(address.lastname === '') {
                this.errors.lastname = 'Lastname is required'
            } else {
                this.errors.lastname = ''
            }

            if(address.phone !== '') {
                if(adressessToValidate.find(addressToFind => addressToFind.phone === address.phone)) {
                    this.errors.phone = 'Phone is already in use'
                } else {
                    this.errors.phone = ''
                }
            } else {
                this.errors.phone = 'Phone is required'
            }

            if(address.email !== '') {
                if(!this.validateEmail(address.email)) {
                    if(adressessToValidate.find(addressToFind => addressToFind.email === address.email)) {
                        this.errors.email = 'Email is already in use'
                    } else {
                        this.errors.email = 'Email is not valid'
                    }
                } else {
                    this.errors.email = ''
                }
            } else {
                this.errors.email = 'Email is required'
            }

            if(this.errors.name === '' && this.errors.lastname === '' && this.errors.phone === '' && this.errors.email === '') {
                return true
            }
            return false
        },
        async handleEdit(addressToEdit) {
            if(this.validateAll(addressToEdit)){
                try {
                    await putAddress(addressToEdit)
                    this.addresses = this.addresses.map(address => {
                        if (address.id === addressToEdit.id) {
                            return addressToEdit
                        } else {
                            return address
                        }   
                    })
                } catch (error) {
                    console.error(error)
                }
            }
        },
        resetErrors() {
            this.errors = {
                name: '',
                lastname: '',
                phone: '',
                email: ''
            }
        }
    },
    mounted() {
        this.getAddressHandler()
    }
}
</script>

<style lang="scss" scoped>
.TableComponent {
    display: flex;
    justify-content: center;
    padding: 10rem 0 0 0;
    .table-component-table {
        width: 75%;
        @media screen and (max-width: 1440px){
            width: 85%;
        }
        @media screen and (max-width: 1150px){
            width: 100%;
        }
        .table-component-table-nav {
            th {
                font-size: 1rem;
                font-weight: 700;
            }
        }
    }
}
</style>