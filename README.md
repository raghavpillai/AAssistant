## Inspiration
The inspiration behind AAssistant came from the realization that the airline customer experience isn't as intuitive as it can be. As a group of individuals that have frequently flown on several different airlines, including American, we have the opportunity to be able to implement and architect our own flow to how we think airlines could treat the airport process, from end to end. From creating a new portal for employees to be able to leverage customer devices for airport process tracking and notifications, to giving customers an end to end guide on when, where and how to navigate their airport travels. AAssistant truly provides an insight into the future of leveraging mobile devices to improve the airline experience . 


## What it does
AAssistant is a mobile app that integrates with American Airlines and provides users with a convenient and streamlined travel experience. Users can manage their itineraries, access their boarding information, and receive real-time updates about their flight. AAssistant also leverages scraping and querying of security checkpoint information, location information and intra-airport transit times to provide an accurate estimation of when to arrive at the airport. 


## How we built it
We leveraged the power of React Native and React to develop the mobile interface of AAssistant. This allowed us to integrate native interfaces and build a truly customer oriented experience. On the other side of the fence, our employee web portal uses Next.js and React. The backend was architected in Python and Flask, with our persistence layer leveraging the quick queries and redundancy of MongoDB for shared data cross several users and both employee and user applications. This technology stack allowed us to create a fast, reliable and most importantly intuitive set of applications that are able to handle large amounts of data and real-time updates.


## Challenges we ran into
One of the biggest challenges we faced was ensuring that the app was able to handle large amounts of data and real-time updates. We also had to work through various technical challenges related to integrating our web and mobile application with our backend. We also had to optimize our data querying to minimize database transactions. 


## Accomplishments that we're proud of
We are proud of the end result -- a customer and employee app ecosystem that makes the flying process more convenient and efficient for American Airlines customers, as well as facilitating the usage of a simple and intuitive tool for employees to more efficiently communicate American Airline's priority to maintain customer satisfaction and loyalty.  


## What we learned
During the development process, we learned about the importance of seamless integration with web and mobile systems and the need for a user-friendly interface. We also learned about the importance of iterative design and continuous improvement. We learned several techniques on able to handle concurrent users with minimal space and compute complexity, which helped us be able to scale across devices. 


## What's next for AAssistant
We are committed to continuously improving AAssistant and making it the go-to mobile app for American Airlines travelers. In the near future, we plan to add new features such as seat selection and in-flight entertainment options. Additionally, we also aim to integrate with more smart devices and enhance our conversational AI capabilities, making the interaction with AAssistant even more seamless and personalized.
