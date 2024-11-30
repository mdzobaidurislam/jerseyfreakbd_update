
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddressFormSignUp({ zone, area,setValue, register, errors, country, state, cities, formData, setFormData }: any) {


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
        const existCities = cities.find((item: any) => item.city_id === value);
        if (existCities) {
            setFormData({
                ...formData,
                city_id: value,
                city_name: existCities.city_name
            });
            setValue('city_id', value, { shouldValidate: true });
        }
    };

    const handleSelectZone = (value: string) => {
        const existState = zone.find((item: any) => item.zone_id === value);
        if (existState) {
            setFormData({
                ...formData,
                zone_id: value,
                zone_name: existState.zone_name
            });
            setValue('zone_id', value, { shouldValidate: true });
        }
    };
    const handleSelectArea = (value: string) => {
        const existState = area.find((item: any) => item.area_id === value);
        if (existState) {
            setFormData({
                ...formData,
                area_id: value,
                area_name: existState.area_name
            });
            setValue('area_id', value, { shouldValidate: true });
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
                {/* City */}

                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium mb-2">City</label>
                    {cities.length > 0 && (
                        <Select value={formData?.city_id} onValueChange={handleSelectCities}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                                {cities.map((item: any) => (
                                    <SelectItem key={item.city_id} value={item.city_id}>{item.city_name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    <input type="hidden"  {...register("city_id", {
                        required: "City is required"
                    })} />
                    {errors.city_id && <p className="text-red-500 text-sm mt-1">{errors.city_id.message}</p>}
                </div>


                {/* zone */}

                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium mb-2">Zone</label>
                    {zone && zone.length > 1 && (
                        <Select value={formData?.zone_id} onValueChange={handleSelectZone}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a zone" />
                            </SelectTrigger>
                            <SelectContent>
                                {zone.map((item: any) => (
                                    <SelectItem key={item.zone_id} value={item.zone_id}>{item.zone_name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    <input type="hidden"  {...register("zone_id", {
                        required: "Zone is required"
                    })} />
                    {errors.zone_id && <p className="text-red-500 text-sm mt-1">{errors.zone_id.message}</p>}
                </div>


                {/* zone */}

                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium mb-2">Area</label>
                    {area && area.length > 1 && (
                        <Select value={formData?.area_id} onValueChange={handleSelectArea}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a area" />
                            </SelectTrigger>
                            <SelectContent>
                                {area.map((item: any) => (
                                    <SelectItem key={item.area_id} value={item.area_id}>{item.area_name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    <input type="hidden"  {...register("area_id", {
                        required: "Area is required"
                    })} />
                    {errors.area_id && <p className="text-red-500 text-sm mt-1">{errors.area_id.message}</p>}
                </div>
            </div>
        </>
    );
}
