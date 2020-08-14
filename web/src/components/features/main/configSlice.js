const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

let BASE_URL = "http://localhost:3004";

export const fetchAsyncConfig = createAsyncThunk(
    'configSlice/fetchAppConfig',
    async (arg, thunkAPI) => {
        try {
            const response = await fetch(BASE_URL+'/appConfig')
            const data = await response.json()
            return data
        } catch (error) {
            console.log('error http get ', error)
        }
    }
)

/**
 * Calling 2 different API's at once (Parallel calls)
 * Using Promise.all to schedule promises and fetch calls
 */
export const fetchCall2AndCall3 = createAsyncThunk(
    'configSlice/fetchCall2AndCall3',
    async function(args, thunkAPI) {
        try {
            let callList = []
            callList = Object.values(args)
            var data = await Promise.all(
                callList.map(
                    call =>
                        fetch(BASE_URL + call.API, {method: call.method}).then(
                            (response) => response.json()
                        )
                        .catch(err => err)
                    )
                );
    
            return (data)
    
        } catch (error) {
            console.log(error)
    
            throw (error)
        }
    }
)

export const submitPaymentAsync = createAsyncThunk(
    'configSlice/submitPaymentAsync',
    async function(args, thunkAPI) {
        try {
        let callList = []
        callList = Object.values(args)
        var data = await Promise.all(
            callList.map(
                call =>
                    fetch(BASE_URL + call.API, {method: call.method}).then(
                        (response) => response.json()
                    )
                    .catch(err => err)
                )
            );

        return (data)

        } catch (error) {
            console.log(error)

            throw (error)
        }
    }
)

const configSlice = createSlice({
    name: 'configSlice',
    initialState: {
        appConfig: null,
        invoices: null,
        vendors: null,
        loading: false
    },
    reducers: {
        toggleLoading: state => {
            state.loading = !state.loading
        }
    },
    extraReducers: {
        [fetchAsyncConfig.fulfilled] : (state, action) => {
            state.loading = false;
            state.appConfig = action.payload
        },
        [fetchAsyncConfig.pending] : (state, action) => {
            state.loading = true;
        },
        [fetchAsyncConfig.rejected] : (state, action) => {
            state.loading = false;
        },


        [fetchCall2AndCall3.fulfilled] : (state, action) => {
            state.loading = false;
            state.invoices = action.payload[0]
            state.vendors = action.payload[1]
        },
        [fetchCall2AndCall3.pending] : (state, action) => {
            state.loading = true;
        },
        [fetchCall2AndCall3.rejected] : (state, action) => {
            state.loading = false;
        }
    }
})

export const {
    toggleLoading
} = configSlice.actions


export const selectConfig = state => state.configSlice.appConfig;

export default configSlice.reducer

