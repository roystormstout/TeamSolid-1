import React, {Component} from 'react'
import {Feed, Icon, Grid, Message} from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import NewPost from './NewPost'
import MediaQuery from 'react-responsive'
import axios from "axios/index";
import moment from "moment";

class MainFeed extends Component {

  constructor(props) {
    super(props)

    this.state = {
      feeds: []
    }

    this.loadPosts = this.loadPosts.bind(this)
    this.createPost = this.createPost.bind(this)
    this.loadPosts()
  }

  loadPosts() {
    axios.post('/api/getPosts').then((response) => {
      this.setState({
        feeds: JSON.parse(response.data)
      })
      this.state.feeds = JSON.parse(response.data);
    });
  }

  createPost(postObject) {
    axios.post('/api/postPost', postObject).then((response) => {
      this.loadPosts()
    })
  }

  render() {

    var feed;
    if (this.state.feeds[0] == undefined) {
      feed = (<Message style={{marginTop: '3em'}} warning compact>
        <Message.Header>There is no post</Message.Header>
        <p>Do you want to post something?</p>
      </Message>);
    }
    else {
      feed = (this.state.feeds.map((feed, index) =>
        <FeedEvent files={feed.files} userName={feed.sid} mainText={feed.msg} numOfLikes={feed.likecount}
                   date={feed.data}
                   postid={feed.postid}/>
      ));
    }
    return (
      <div>
        <div style={{
          marginLeft: '10vw',
          maxHeight: '50vh',
          overflow: 'scroll',
          overflowY: 'scroll',
          overflowX: 'hidden'
          }}>
          <MediaQuery query="(max-device-width: 1224px)">
            <Feed size='small' className='mobileFeed'>
              {feed}
            </Feed>
          </MediaQuery>
          <MediaQuery query="(min-device-width: 1224px)">
            <Feed size='small'>
              {feed}
            </Feed>
          </MediaQuery>
        </div>
        <div style={{}}>
          <NewPost createPost={this.createPost}/>
        </div>
      </div>
    );
  }
}

export default MainFeed
