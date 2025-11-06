import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SurveysService } from "./surveys.service";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import type { SurveyId } from "./surveys.type";

@Controller("surveys")
export class SurveysController {
    constructor(private surveysService: SurveysService) {}

    @Get(":surveyId")
    getSurveyData(@Param("surveyId") surveyId: SurveyId) {
        return this.surveysService.getSurveyData(surveyId);
    }

    @Post()
    createSurvey(@Body() dto: CreateSurveyDto) {
        return this.surveysService.createSurvey(dto);
    }
}
