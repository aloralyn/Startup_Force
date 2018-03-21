import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Leanne Graham',
      title: 'Head of HR',
      startDate: 'May 2016'
    }
  }

  render() {
    return (
      <Card>
        <Image src='https://res.cloudinary.com/teepublic/image/private/s--UvSUNgzW--/b_rgb:fffffe,t_Heather%20Preview/c_lpad,f_jpg,h_630,q_90,w_1200/v1494469473/production/designs/1595608_1.jpg' />
        <Card.Content>
          <Card.Header>
            {this.state.name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              At CompanyXYZ since {this.state.startDate}
            </span>
          </Card.Meta>
          <Card.Description>
            Title: {this.state.title}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='calendar outline' />
            Request Time Off
          </a>
        </Card.Content>
      </Card>
    )
  }
}

export default ProfilePic;
