import styled from 'styled-components'

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const HeaderContainer = styled.div`
  background-color: #f1f5f9;
  padding: 10px 70px;
`

export const WebsiteLogo = styled.img`
  width: 10%;
`

export const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 40px 70px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

export const SelectElement = styled.select`
  width: 350px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 15px;
  outline: none;
`

export const OptionElement = styled.option``

export const ProjectsList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`

export const ProjectsListItem = styled.li`
  box-shadow: 5px -2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`

export const ProjectImage = styled.img`
  border-radius: 10px 10px 0 0;
`

export const ProjectNameContainer = styled.div`
  padding: 10px 20px;
`

export const ProjectName = styled.p`
  font-size: 20px;
  margin-top: 5px;
`

export const FailureContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FailureImage = styled.img`
  width: 30%;
`

export const FailureHeadline = styled.h1`
  color: #475569;
  margin-top: 30px;
`

export const FailureDescription = styled.p`
  color: #475569;
  margin-top: 0;
`

export const RetryButton = styled.button`
  background-color: #328af2;
  border: none;
  border-radius: 5px;
  padding: 15px 30px;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
`
