"use client";
import React from "react";
import { useState } from "react";

export const handleNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};

const Card = () => {
  return (
    <ul className="notification-container">
      <li className="notification-item success">
        <div className="notification-content">
          <div className="notification-icon">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div className="notification-text">Demanda Salva com sucesso!</div>
        </div>
        <div className="notification-icon notification-close">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>
        <div className="notification-progress-bar" />
      </li>
      <li className="notification-item error">
        <div className="notification-content">
          <div className="notification-icon">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div className="notification-text">An issue occurred.</div>
        </div>
        <div className="notification-icon notification-close">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>
        <div className="notification-progress-bar" />
      </li>
    </ul>
  );
};

export const ErrorNotification = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  isOpen && (
    <div className="notification-item error">
      <div className="notification-content">
        <div className="notification-icon">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div className="notification-text">Erro ao salvar demanda, por favor tente novamente.</div>
      </div>
      <div className="notification-icon notification-close" onClick={close}>
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </div>
      <div className="notification-progress-bar" />
    </div>
  );
};
export const SuccessNotification = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  isOpen && (
    <div className="notification-item success">
    <div className="notification-content">
      <div className="notification-icon">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg> 
      </div>
      <div className="notification-text">Demanda Salva com sucesso!</div>
    </div>
    <div className="notification-icon notification-close">
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18 17.94 6M18 18 6.06 6"
        />
      </svg>
    </div>
    <div className="notification-progress-bar" />
  </div>
  );
};

export default Card;
