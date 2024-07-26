import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {
  AppContainer,
  HeaderContainer,
  WebsiteLogo,
  ContentContainer,
  SelectElement,
  OptionElement,
  ProjectsList,
  ProjectsListItem,
  ProjectImage,
  ProjectNameContainer,
  ProjectName,
  FailureContainer,
  FailureImage,
  FailureHeadline,
  FailureDescription,
  RetryButton,
} from './styledComponents'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProjectsApp extends Component {
  state = {
    projectsData: [],
    selectedOption: categoriesList[0].id,
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getData()
  }

  onChangeOption = event => {
    this.setState({selectedOption: event.target.value}, this.getData)
  }

  getData = async () => {
    await this.setState({apiStatus: apiStatusConstants.inProgress})

    const {selectedOption} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${selectedOption}`,
    )

    if (response.ok) {
      const data = await response.json()
      const {projects} = data
      const updatedProjectsData = projects.map(eachProject => ({
        id: eachProject.id,
        name: eachProject.name,
        imageUrl: eachProject.image_url,
      }))

      this.setState({
        projectsData: updatedProjectsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div
      data-testid="loader"
      style={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loader type="ThreeDots" color="#328af2" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {projectsData} = this.state

    return (
      <ProjectsList>
        {projectsData.map(eachProject => (
          <ProjectsListItem key={eachProject.id}>
            <ProjectImage src={eachProject.imageUrl} alt={eachProject.name} />
            <ProjectNameContainer>
              <ProjectName>{eachProject.name}</ProjectName>
            </ProjectNameContainer>
          </ProjectsListItem>
        ))}
      </ProjectsList>
    )
  }

  renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <FailureHeadline>Oops! Something Went Wrong</FailureHeadline>
      <FailureDescription>
        We cannot seem to find the page you are looking for.
      </FailureDescription>
      <RetryButton type="button" onClick={this.getData}>
        Retry
      </RetryButton>
    </FailureContainer>
  )

  renderAppropriateView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    const {selectedOption} = this.state

    return (
      <AppContainer>
        <HeaderContainer>
          <WebsiteLogo
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
          />
        </HeaderContainer>
        <ContentContainer>
          <SelectElement value={selectedOption} onChange={this.onChangeOption}>
            {categoriesList.map(eachCategory => (
              <OptionElement key={eachCategory.id} value={eachCategory.id}>
                {eachCategory.displayText}
              </OptionElement>
            ))}
          </SelectElement>
          {this.renderAppropriateView()}
        </ContentContainer>
      </AppContainer>
    )
  }
}

export default ProjectsApp
