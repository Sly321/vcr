import AbstractSeries, { State as AbstractSeriesState } from "@components/abstract/AbstractSeries"
import Mail from "@components/button/Mail"
import ButtonRemove from "@components/button/remove/ButtonRemove"
import { Tab, Tabs } from "@components/tabs"
import SeasonModel from "@model/SeasonModel"
import { Episode } from "@model/Series"
import SeriesModel from "@model/SeriesModel"
import Skeleton from "@scenes/skeleton/Skeleton"
import EventBus from "@service/EventBus/EventBus"
import SeriesHandler from "@service/SeriesHandler"
import React, { ChangeEvent } from "react"
import { RouteComponentProps } from "react-router"
import { Link } from "react-router-dom"
import "./View.less"


export interface State extends AbstractSeriesState {
    changed: boolean
    bsto: string
    otaku: string
    suggestedUsername: string
}

export default class View extends AbstractSeries<RouteComponentProps<{ id: number }>, State> {

    constructor(props: RouteComponentProps<{ id: number }>) {
        super(props)

        this.state = {
            series: null,
            changed: false,
            bsto: "",
            otaku: "",
            suggestedUsername: ""
        }

        this.savePreferences = this.savePreferences.bind(this)
        this.removeSeries = this.removeSeries.bind(this)

        EventBus.instance.emit("getUserSeries", props.match.params.id).then((series: SeriesModel) => this.setState({ series }))
        EventBus.instance.emit("getLinksOfSeries", props.match.params.id).then((links: { [key: string]: string }) => {
            links && this.setState({
                otaku: links.otaku || "",
                bsto: links.bsto || (this.state.bsto || "")
            })
        })
    }

    removeSeries() {
        EventBus.instance.emit("removeSeries", this.props.match.params.id).then(() => {
            window.location.pathname = "/"
        })
    }

    suggestSeries() {
        EventBus.instance.emit("writeMessage", this.props.match.params.id, this.state.suggestedUsername)
    }

    handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
            case "otaku":
                this.setState({
                    otaku: e.target.value,
                    changed: true
                })
                break
            case "bsto":
                this.setState({
                    bsto: e.target.value,
                    changed: true
                })
                break
            case "username":
                this.setState({
                    suggestedUsername: e.target.value
                })
                break
        }
    }

    savePreferences() {
        if (!this.state.series) {
            return
        }

        const links = {
            bsto: this.state.bsto,
            otaku: this.state.otaku
        }

        EventBus.instance.emit("saveLinkToSeries", this.state.series.id, "", links).then(() => {
            this.setState({
                changed: false
            })
        })
    }

    buildEpisodeNumber(episode: Episode) {
        const episodeNumber = episode.episode < 10 ? `0${episode.episode}` : `${episode.episode}`
        const seasonNumber = episode.season < 10 ? `0${episode.season}` : `${episode.season}`
        return `S${seasonNumber}E${episodeNumber}`
    }

    public renderSeries(series: SeriesModel) {
        const { genres, name, seasons } = series
        return (
            <div>
                <div className="series-container">
                    <div className="series-header">
                        <img src={this.getImageSrc(series, 500)} alt="" />
                        <Link className="series-header--link" to="/">
                            <span className="fa fa-arrow-left fa-2x"></span>
                        </Link>
                        <div className="series-name-wrapper">
                            <div className="series-name">
                                {name}
                            </div>
                        </div>
                        <div className="genre-wrapper">
                            {genres && genres.map(this.mapGenres)}
                        </div>
                    </div>
                    <div className="series-actions">
                        <div className="head">
                            <div className="input-wrapper">
                                <div className="input-container">
                                    <label htmlFor="bsto">bs.to</label>
                                    <input id="bsto" type="type" placeholder="https://bs.to/example" value={this.state.bsto} onChange={this.handleInput} />
                                    <label htmlFor="otaku">otakustream</label>
                                    <input id="otaku" type="type" placeholder="https://otakustream.tv/anime/xyz/" value={this.state.otaku} onChange={this.handleInput} />
                                    <label htmlFor="username">empfehlen</label>
                                    <input id="username" placeholder="Name" onChange={this.handleInput} />
                                </div>
                            </div>
                            <div className="action-wrapper">
                                <Mail onClick={this.suggestSeries.bind(this)} />
                            </div>
                            <div className="action-wrapper">
                                <ButtonRemove onClick={this.removeSeries} />
                            </div>
                        </div>
                        <div className="spacer"></div>
                        {this.state.changed ? <button className="save" onClick={this.savePreferences}>Speichern</button> : ""}
                    </div>
                </div>
                <div className="series-content">
                    <div className="series-content--description">
                        {series.overview}
                    </div>
                    <Tabs defaultActiveTabIndex={0}>
                        {seasons && seasons.map(this.mapSeason)}
                    </Tabs>
                </div>
            </div>
        )
    }

    public mapSeason = (season: SeasonModel, index: number) => {
        return (
            <Tab key={season.seasonNumber} title={`Staffel ${index + 1}`}>
                <table key={season.seasonNumber} className="season-wrapper">
                    <thead>
                        <tr>
                            <th>
                                <button
                                    className="fa fa-eye"
                                    onClick={() => SeriesHandler.toggleSeason(this.state.series!, season)}>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="episodes-wrapper">
                        {season.episodes ? season.episodes.map(this.mapEpisode) : ""}
                    </tbody>
                </table>
            </Tab>
        )
    }

    public mapEpisode = (episode: Episode) => {
        return (
            <tr key={episode.episode}>
                <td>
                    <button onClick={() => SeriesHandler.toggleEpisode(this.state.series!, episode)}>
                        <span className={episode.isNotAired() ? ("fa fa-clock-o") : (episode.watched ? "fa fa-check-square-o" : "fa fa-square-o")}></span>
                    </button>
                </td>
                <td>
                    {this.buildEpisodeNumber(episode)}
                </td>
                <td>
                    {episode.name}
                </td>
                <td>
                    {this.dateFormat(episode.airDate)}
                </td>
            </tr>
        )
    }

    public mapGenres = (genre: string, index: number) => {
        return (
            <div key={index} className="genre-badge">
                {genre}
            </div>
        )
    }

    public render() {
        return <Skeleton>
            <div className="view-series-wrapper">
                {this.state.series ? this.renderSeries(this.state.series) : ""}
            </div>
        </Skeleton>
    }
}
