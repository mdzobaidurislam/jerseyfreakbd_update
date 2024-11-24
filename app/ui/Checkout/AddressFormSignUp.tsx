import CustomInput from '@/app/ui/CustomInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function AddressFormSignUp({ setValue, register, errors, country, state, cities, formData, setFormData }: any) {


    const handleSelectChange = (value: string) => {
        const existCountry = country.find((item: any) => item.id === value);
        if (existCountry) {
            setFormData({
                ...formData,
                country_id: value,
                country_name: existCountry.name
            });
            setValue('country_id', value, { shouldValidate: true });
        }
    };

    const handleSelectCities = (value: string) => {
        const existCities = cities.find((item: any) => item.id === value);
        if (existCities) {
            setFormData({
                ...formData,
                city_id: value,
                city_name: existCities.name
            });
            setValue('city_id', value, { shouldValidate: true });
        }
    };

    const handleSelectState = (value: string) => {
        const existState = state.find((item: any) => item.id === value);
        if (existState) {
            setFormData({
                ...formData,
                state_id: value,
                state_name: existState.name
            });
            setValue('state_id', value, { shouldValidate: true });
        }
    };

    return (
        <>


            <div className='grid lg:grid-cols-3 gap-3'>

                <div className="relative w-full">
                    <label htmlFor="postal_code" className="text-lg mb-2 block">Post Code *</label>
                    <input
                        {...register('postal_code', { required: 'Post code is required' })}
                        className={` ${errors.postal_code ? 'border-red-500' : 'border-gray-300'}
                                w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm 
                                border focus:outline-none focus:ring-1 focus:ring-accent-lightPink 
                                focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input`}
                        id="postal_code"
                        type="text"
                        placeholder="Post code"
                    />
                </div>
                {/* State */}
                {state && state.length > 1 && (
                    <div className="mb-4 w-full">
                        <label className="block text-lg font-medium mb-2">State</label>
                        <Select value={formData?.state_id} onValueChange={handleSelectState}>
                            <SelectTrigger className=" w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm 
                                border focus:outline-none focus:ring-1 focus:ring-accent-lightPink 
                                focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input">
                                <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                            <SelectContent>
                                {state.map((item: any) => (
                                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <input type="hidden"  {...register("state_id", {
                            required: "State is required"
                        })} />
                        {errors.state_id && <p className="text-red-500 text-sm mt-1">{errors.state_id.message}</p>}
                    </div>
                )}

                {/* City */}
                {cities.length > 0 && (
                    <div className="mb-4 w-full">
                        <label className="block text-lg font-medium mb-2">City</label>
                        <Select value={formData?.city_id} onValueChange={handleSelectCities}>
                            <SelectTrigger className="w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm 
                                border focus:outline-none focus:ring-1 focus:ring-accent-lightPink 
                                focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input">
                                <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent className='backdrop-blur-lg' >
                                {cities.map((item: any) => (
                                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <input type="hidden"  {...register("city_id", {
                            required: "City is required"
                        })} />
                        {errors.city_id && <p className="text-red-500 text-sm mt-1">{errors.city_id.message}</p>}
                    </div>
                )}
            </div>
        </>
    );
}
