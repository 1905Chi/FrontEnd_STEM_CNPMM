import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import BannerGroup from '../components/BannerGroup';
import Post from '../../home/components/Post';
import PostItem from '../../home/components/PostItem';
import { useSelector } from 'react-redux';
import { selectSelectedOption } from '../../../redux/Group';
import { selectselectGroup } from './../../../redux/GetItemGroup';
import PostGroup from '../components/PostGroup';
import QuestionGroup from '../components/QuestionGroup';
import MemberGroup from '../components/MemberGroup';
import EventGroup from '../components/EventGroup';
import DocumentGroup from '../components/DocumentGroup';
import Exam from '../../class/exam/Exam';
export default function MainGroup() {
  const selectedOption = useSelector(selectSelectedOption);
  const inforGroup = useSelector(selectselectGroup);
  const { uuid } = useParams();


  return (
    <>
    
      <div>
        <BannerGroup />

        {(selectedOption === 'introduce' && inforGroup!== null) ? (
          <div>
            <div style={{ margin: '25px', borderRadius: '10px', padding: '5px', background: 'aliceblue' }}>
              <h3 style={{ borderBottom: '0.5px solid black' }}>Giới thiệu về nhóm này</h3>
              <h4>Đây là nhóm: {inforGroup.config.accessibility ==='PUBLIC'? ('Công Khai') : 'Riêng tư'}</h4>
              <h4>Thành viên: 100</h4>
              <h4>Ngày tạo: {inforGroup.createdAt}</h4>
            </div>
            <div style={{ margin: '25px', borderRadius: '10px', padding: '5px', background: 'aliceblue' }}>
              <h3 style={{ borderBottom: '0.5px solid black' }}>Quy tắc của quản trị viên:</h3>
              <p>{inforGroup.config.description}</p>
            </div>
          </div>
        ) : null}
        {selectedOption === 'post' ? <PostGroup /> : null}
        {selectedOption === 'member' ? <MemberGroup /> : null}
        {selectedOption === 'event' ? <EventGroup /> : null}
        {selectedOption === 'question' ? <QuestionGroup /> : null}
        {selectedOption === 'document' ? <DocumentGroup /> : null}
        {selectedOption === 'exam' ? <Exam /> : null} 


       

       
      </div>
    </>
  );
}
