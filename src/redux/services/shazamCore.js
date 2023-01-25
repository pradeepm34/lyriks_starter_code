import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '6a684236d6msh82cf5551c865715p14bae2jsn8df3a7eb70c1');
            return headers;
        },
    }),

    endpoints: (builder) => (
        {
            getTopCharts: builder.query({ query: () => '/charts/world' }),
            getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}` }),
            getRelatedSongs: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
            getArtistDetails: builder.query({ query: (artistId) => `/artists/details?artist_id=${artistId}` }),
            getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}` })
        }
    )
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetRelatedSongsQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery
} = shazamCoreApi;