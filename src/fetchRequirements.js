import axios from 'axios';
import * as cheerio from 'cheerio';

const fetchRequirements = async (year, program, major) => {
    try {
        const form = new URLSearchParams();
        const values = {
            "2024-2025": "44",
            "2023-2024": "39",
            "2022-2023": "36",
            "2021-2022": "34",
            "2020-2021": "33",
            "2019-2020": "29",
            "2018-2019": "28",
            "2017-2018": "20",
            "2016-2017": "6"};

        const select = values[year];

        if (!select)
            throw(new Error('Invalid input'));

        form.append('catalog', select);
        form.append('sel_cat_submit', 'GO');

        const response = await axios.post('https://calendar.ualberta.ca/index.php', form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html'
            },
            maxRedirects: 5,
            validateStatus: status => status < 400});

        const $ = cheerio.load(response.data);

        const requirements = $().text();

        return response.data;
    } catch (error) {
        console.error('Error fetching calendar:', error.message);
        throw(error);
    }
}

fetchRequirements('2022-2023', 'Science', 'Computer Science')
    .then(data => console.log(data))
    .catch(error => console.error(error));

export default fetchRequirements;