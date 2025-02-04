'use client';

import React, { Fragment, useRef } from 'react';
import { useFunnel } from '@use-funnel/browser';
import { useClickAway } from 'react-use';
import SubmissionFunnelRender from '@/app/(pages)/chat/[id]/submission/_components/SubmissionFunnelRender';
import SubmissionLeaveModal from '@/app/(pages)/chat/[id]/submission/_components/SubmissionLeaveModal';
import { Chevron, X } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import Portal from '@/components/modal/ModalPortal';
import { useModal } from '@/hooks/useModal';
import { Mission } from '@/types/challenge';

export type SubmissionFirst = {
  checkedList?: (Mission & { checked: boolean })[];
};

export type SubmissionSecond = {
  checkedList?: (Mission & { checked: boolean })[];
};

export type SubmissionFunnelProps = {
  first: SubmissionFirst;
  second?: SubmissionSecond;
};

const SubmissionPage = () => {
  const modalProps = useModal('feed-profile');
  const modalRef = useRef<HTMLDivElement>(null);

  const funnel = useFunnel<SubmissionFunnelProps>({
    id: 'chat-submission-submit',
    initial: {
      step: 'first',
      context: {},
    },
  });

  useClickAway(modalRef, () => {
    modalProps.closeModal();
  });

  return (
    <PageLayout
      header={
        <Header className={'bg-v1-background'}>
          <Header.Item>
            {funnel.step === 'first' ? (
              <Header.Icon Icon={Chevron} onClick={() => funnel.history.back()} />
            ) : (
              <Header.Icon Icon={X} onClick={() => modalProps.openModal()} />
            )}
          </Header.Item>
          <Header.Item>
            {funnel.step === 'first' ? (
              <Header.Title>미션완료 제출</Header.Title>
            ) : (
              <Header.Title>{funnel.context!.checkedList!.find((item) => item.checked === true)!.name}</Header.Title>
            )}
          </Header.Item>
        </Header>
      }
      footer={<Fragment />}
    >
      <div className={'px-6'}>
        <SubmissionFunnelRender funnel={funnel} />
      </div>
      <Portal>
        <SubmissionLeaveModal modalProps={modalProps} ref={modalRef} />
      </Portal>
    </PageLayout>
  );
};

export default SubmissionPage;
