import { HttpHeaders, HttpParams } from '@angular/common/http';
import { from, of } from 'rxjs';

export interface newsApiContract {
  title?: string;
  description?: string;
  urlToImage?: string;
  content?: string;
  author?: string;
  url?: string;
}

export const ConfigList = {
  /*news widget config section ------------------------------------------------*/
  news: {
    title: 'Новости',

    staticContent: false,//of([{description: 'djihfiuerhfgyeu', title: 'Title test'}]),

    requestConfig: {
      method: 'get',
      url: 'https://newsapi.org/v2/top-headlines?apiKey=749b7945815d4a43b3ec7af226279a4e&pageSize=1',
      params: {
        country: 'ru',
        q: '',
        category: 'politics',
      },
      options: {
        params:new HttpParams({fromObject: {
          country: 'ru',
          q: '',
          category: 'politics',
        }}),
        body: {},
        headers: new HttpHeaders(),
        observe: 'body',
      },
    },

    responseConfig: (responseApi: { [x: string]: string }) => {
      return JSON.parse(responseApi['contents']).articles;
    },

    contentAdapter: class news {
      [key: string]: string | undefined;
      constructor(responseApi: newsApiContract) {
        this.title = responseApi.title;
        this.description = responseApi.description;
        this.imgUrl = responseApi.urlToImage;
        this.article = responseApi.content;
        this.author = responseApi.author;
        this.sourceUrl = responseApi.url;
      }
    },

    formActionModel: [
      { name: 'country', label: 'RU', value: 'ru', type: 'radio' },

      { name: 'country', label: 'US', value: 'us', type: 'radio' },

      /*{
        name: 'country',
        label: 'Страна',
        type: 'select',
        value: 'ru',
        options: {
          ru: 'Россия',
          us: 'США',
          fr: 'Франция',
        },
      },*/
      {
        name: 'q',
        label: 'ключевое слово',
        value: '',
        type: 'text',
      },
      {
        name: 'category',
        label: 'Тема',
        type: 'select',
        value: '',
        options: {
          ['']: 'Все категории',
          technology: 'Технологии',
          business: 'Бизнес',
          sports: 'Спорт',
        },
      },
    ],
  },
};
// weather section ------------------------------------------------//
