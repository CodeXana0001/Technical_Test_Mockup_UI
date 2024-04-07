import {MutableRefObject, useEffect, useRef, useState} from "react";
import HistoryItem, {HistoryItemProps} from "./components/HistoryItem";
import API from "./contants/api";

type useAppProps = {
    inputRef: MutableRefObject<string>,
    weather: weatherProps,
    historyList: HistoryItemProps[],
    handleSearchBarClick: () => Promise<void>;
    handleItemSearchClick: (item: HistoryItemProps) => Promise<void>;
    handleItemDeleteClick: (item: HistoryItemProps) => void;
};

type weatherProps = {
    city?: string;
    country?: string;
    searchTime?: string;
    humidity?: number;
    main?: string;
    temp?: number;
    maxTemp?: number;
    minTemp?: number;
};

const useApp = () => {
    const inputRef = useRef<string>("");
    const [weather, setWeather] = useState<weatherProps>({});
    const [historyList, setHistoryList] = useState<HistoryItemProps[]>([]);

    const handleSearchBarClick = async () => {
        await performSearch((inputRef.current as any).value ?? "");
    }

    const handleItemSearchClick = async (item: HistoryItemProps) => {
        await performSearch(item.city ?? "");
    }

    const handleItemDeleteClick = (item: HistoryItemProps) => {
        let newHistoryList = [];
        for(let a of historyList) {
            if (a.id !== item.id) {
                newHistoryList.push(a);
            }
        }
        setHistoryList(newHistoryList);
    }

    const performSearch = async (searchString: string) => {
        try {
            const response: any = await fetch(API.BaseUrl + `q=${searchString ?? ""}&appid=${API.Key}`);
            if (!response || !response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            if (data) {
                setWeather({
                    city: data.name,
                    country: data.sys?.country,
                    searchTime: currentTime(),
                    humidity: data.main?.humidity,
                    main: data.weather[0]?.main,
                    temp: tempConvert(data.main?.temp),
                    maxTemp: tempConvert(data.main?.temp_max),
                    minTemp: tempConvert(data.main?.temp_min),
                });
                const newHistoryList = [
                    {
                        id: uuidv4(),
                        city: data.name,
                        country: data.sys?.country,
                        searchTime: currentTime(),
                    } as HistoryItemProps,
                    ...historyList,
                ];
                setHistoryList(newHistoryList);
                (inputRef.current as any).value = "";
            }
            else {
                throw new Error('Failed to fetch data');
            }
        }
        catch (e) {
            window.alert(e);
        }
    }


    const currentTime = () => {
        const now = new Date();
        const date = ('0'+ now.getDate()).slice(-2);
        const month = ('0'+ now.getMonth()).slice(-2);
        const year = now.getFullYear()
        const hour = ('0' + (now.getHours() >= 13? now.getHours() - 12 : now.getHours())).slice(-2);
        const minute = ('0'+ now.getMinutes()).slice(-2);
        const ampm = now.getHours() >= 12 ? 'pm' : 'am';
        return `${date}-${month}-${year} ${hour}:${minute}${ampm}`;
    }

    const tempConvert = (temp: number) => {
        return Math.round((temp - 273.15) * 10) / 10;
    }

    const uuidv4 = () => {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }

    return {
        inputRef,
        weather,
        historyList,
        handleSearchBarClick,
        handleItemSearchClick,
        handleItemDeleteClick,
    } as useAppProps
};

export default useApp;