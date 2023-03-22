import React, { useState, useEffect } from 'react'
import { personTypes } from '../models/person-type'
import province from '../models/province'
import { ThailandDatabase } from '../models/ThailandDatabase'

const NationalComponent = () => {



    const [nationalId, setNationalId] = useState<string>()

    const [personType, setPersonTypes] = useState<string[]>([])
    const [providerTypes, setProviderTypes] = useState<string[]>([])
    const [amphoeTypes, setAmphoeTypes] = useState<string[]>([])
    const [isValid, setIsValid] = useState<boolean>(false)



    const getInformation = () => {

        const personType = Number(nationalId?.substring(0, 1))
        const provinceCode = Number(nationalId?.substring(1, 3))
        const amphoeCode = Number(nationalId?.substring(1, 5))

        const isValid = validateThaiCitizenID(nationalId || '')
        const personTypeText: string | undefined = getPersonTypes(personType)
        const provinceText: string | undefined = getProvinceCode(provinceCode)
        const amphoeType: string | undefined = getAmphoe(amphoeCode)

        
        setPersonTypes([personTypeText || '',personType.toString()])
        setProviderTypes([provinceText || '',provinceCode.toString()])
        setAmphoeTypes([amphoeType || '', amphoeCode.toString()])
        setIsValid(isValid)

    }

    function validateThaiCitizenID(id: string): boolean {
        if (id.length !== 13 || id.charAt(0).match(/[09]/)) return false

        let sum = 0

        for (let i = 0; i < 12; i++) {
            sum += Number(id.charAt(i)) * (13 - i)
        }

        if ((11 - (sum % 11)) % 10 !== Number(id.charAt(12))) return false

        return true
    }



    const getPersonTypes = (personType: number | undefined): string | undefined => {
        if (personType !== undefined) {
            return personTypes[personType]
        }
        return undefined
    }

    const getProvinceCode = (provinceCode: number | undefined): string | undefined => {
        let data: string | undefined = ''
        if (provinceCode !== undefined) {
            province.filter((item) => {
                if (item.code === provinceCode) {

                    data = item.thName

                }
            })
        }
        return data
    }

    const getAmphoe = (amphoeCode: number): string | undefined => {
        if (amphoeCode !== undefined) {
            let data: string | undefined = ''
            ThailandDatabase.filter((item) => {
                if (item.amphoe_code === amphoeCode) {
                    data = item.amphoe
                }
            })
            return data
        }
    }





    // useEffect(() => {
        
    //     getInformation()
    // }, [nationalId])
    useEffect(() => {
        getInformation()
    }, [nationalId])

    return (
        <div className=" flex min-h-screen flex-col  overflow-hidden bg-gray-50 py-12 flex-nowrap bg-slate-500">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-xl rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-20">
                    <div>
                        <form>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xl">
                                    <div className="w-full h-20 ">
                                        <input className=" w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-2xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700  font-bold" type="text"
                                            placeholder="1-2345-67890-12-3"
                                            onChange={(e) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');

                                                setNationalId(e.target.value)
                                            }}
                                            pattern="^-?[0-9]\d*\.?\d*$"
                                            maxLength={13}
                                            minLength={13}

                                        />
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>

                    <div className=" flex-nowrap">
                        <div className='font-semibold text-3xl '>
                            <p>{nationalId}</p>
                        </div>

                        {
                            nationalId?.length === 13 ?
                                <div className='font-semibold text-3xl '>
                               
                                    {isValid ? <div className='font-semibold text-3xl underline text-center text-green-400'>
                                    <p>เลขบัตรประชาชนถูกต้อง</p>
                                    </div>
                                        :
                                        <div className='font-semibold text-3xl underline text-center text-orange-600'>
                                    <p>เลขบัตรประชาชนไม่ถูกต้อง</p>
                                        </div>
                                    }
                            
                            </div>
                                :
                                <div className='font-semibold text-3xl text-orange-400'>
                                    <p>กรุณากรอกเลขบัตรประชาชน</p>
                                </div>
                            
                            
                            
                        }
                        <div className='font-semibold text-3xl underline text-left'>
                            {
                            
                                personType[1] === 'NaN' || personType[1] === '0' ? <p></p> : <p>{ personType[1]}</p>
                            }
                        </div>
                        <div className='text-left'>
                            {

                                personType[0] === 'NaN' ? <p></p> : <p>{personType[0]}</p>
                            }
                        </div>
                        <div className='font-semibold text-3xl underline text-left'>
                            {

                                providerTypes[1] === 'NaN' || providerTypes[1] === '0'? <p></p> : <p>{providerTypes[1]}</p>
                            }
                        </div>
                        <div className='text-left'>
                            {

                                providerTypes[0] === 'NaN' ? <p></p> : <p>{providerTypes[0]}</p>
                            }
                        </div>

                        <div className='font-semibold text-3xl underline text-left'>
                            {

                                amphoeTypes[1] === 'NaN' || amphoeTypes[1] === '0' ? <p></p> : <p>{amphoeTypes[1]}</p>
                            }
                        </div>
                        <div className='text-left'>
                            {

                                amphoeTypes[0] === 'NaN' ? <p></p> : <p>{amphoeTypes[0]}</p>
                            }
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NationalComponent

