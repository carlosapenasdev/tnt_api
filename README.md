# Prepare Questions API

This project is designed to simplify the process of preparing questions for meetings in the Talk'n Talk community. By using the TNT API to gather data, it eliminates the need for manual data entry and saves time. This tool is perfect for those who want to streamline their meeting preparation and ensure that they have ideas to talk about on a variety of topics.

## Table of Contents

- [Introduction](https://github.com/carlossantoswd/tnt_api#introduction)
- [Getting Started](https://github.com/carlossantoswd/tnt_api#getting-started)
- [Prerequisites](https://github.com/carlossantoswd/tnt_api#prerequisites)
- [Installation](https://github.com/carlossantoswd/tnt_api#installation)
- [Usage](https://github.com/carlossantoswd/tnt_api#usage)
- [Contributing](https://github.com/carlossantoswd/tnt_api#contributing)
- [License](https://github.com/carlossantoswd/tnt_api#license)

## Introduction

I am an English student and I am involved in a community called Talk'n Talk, which by the way is the best platform in the world to gain confidence speaking English. In this community, I am part of a leadership skills training program where I am an English Conversation Group Facilitator. Every week I need to prepare a topic to discuss in an online room. We usually conduct the conversation using questions so that each student can answer about their point of view on that subject. For example: In one week, I brought the topic: "Women in tech careers" where we discussed why we see so few women in the technology market, what was the situation of female positions in the participants' companies, etc.

Selecting the topic and creating the questions are part of the leadership training process within Talk'n Talk. With this project, I want to scrape questions already inserted on TNT API, and with the help of AI, obtain insights for new topics! Maybe in the future, it will be possible to send a request to the API about a certain subject, and it will not only return the questions already inserted in that context but also create new ones.

## Getting Started

### Prerequisites

- Node.js version 16.14.2
- MongoDB version 4.4.16

### Installation

- Clone this repository on your machine
    
    ```jsx
    git clone git@github.com:carlossantoswd/tnt_api.git
    ```
    
- Install dependencies.
    
    ```jsx
    npm install
    ```
    
- Create your own .env file by coping the example
    
    ```jsx
    cp .env.example .env
    ```
    
- Replace the env vars with you values:
    
    ```jsx
    TOKEN_GOOGLE={your Google bearer token when logging into the backoffice}
    BASE_URL={The URL of the backoffice API (not shown here for security reasons)}
    MONGO_URI=mongodb://localhost:27017/tnt
    START_AT={the page number to start}
    ```
    

### Usage

To retrieve the registered questions from the API, run the following command:

```
node grabQuestions.js
```

## Contributing

We welcome contributions to this project! If you find a bug or have a feature request, please open an issue on our [GitHub repository](https://github.com/carlossantoswd/tnt_api). We appreciate all contributions and thank you for your help in improving this project!

## License

MIT License

This project is licensed under the terms of the MIT license. See the [LICENSE](<https://github.com/carlossantoswd/tnt_api/blob/main/LICENSE>) file for more details.
