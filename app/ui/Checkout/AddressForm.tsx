import CustomInput from '@/app/ui/CustomInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function AddressForm({ zone, area, setValue, register, errors, country, state, cities, formData, setFormData }: any) {


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
            {/* Country/Region */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Country *</label>
                <Select value={formData?.country_id} onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                        {country.map((item: any) => (
                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <input type="hidden"  {...register("country_id", {
                    required: "Country is required"
                })} />
                {errors.country_id && <p className="text-red-500 text-sm mt-1">{errors.country_id.message}</p>}
            </div>

            {/* Address */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Address</label>
                <Textarea
                    name="address"
                    placeholder="Address"
                    className="w-full"
                    {...register("address", { required: "Address is required" })}

                />

                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            {/* Postal Code */}
            <div className="mb-4 w-full">
                <label className="block text-sm font-medium mb-2">Postal code</label>
                <input
                    name="postal_code"
                    type="number"
                    placeholder="1212"

                    {...register("postal_code", {
                        required: "Postal code is required",
                        pattern: {
                            value: /^[0-9]{4,6}$/,
                            message: "Invalid postal code"
                        }
                    })}
                    className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-lightPink focus:border-accent-lightPink sm:text-sm`}

                />


                {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code.message}</p>}
            </div>
            <div className='grid lg:grid-cols-3 gap-3'>




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
